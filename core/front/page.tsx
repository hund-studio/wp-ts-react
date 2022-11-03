import { FC, ReactNode, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { View } from "./view";
import useSWR from "swr";
import { fetcher } from "./utils/fetcher";
import { getServerData } from "./utils/getServerData";
import { createErrorString } from "./utils/createErrorString";
import ErrorResponse from "./templates/ErrorPage/errorPage";
import appConfig from "@config/app.json";

// todo: check if getServerDataWorks

const Page: FC = () => {
	const [routes, setRoutes] = useState<ReactNode>();

	const { data, error } = useSWR<TMP_WPReactRoutesTree>(["/routes"], fetcher, {
		fallbackData: getServerData(appConfig.routes.element.id),
		onSuccess: async (routesTree, _key, _config) => {
			const TMPRouteTree = Object.keys(routesTree).reduce((acc, key) => {
				const tuples = Object.keys(routesTree[key]).map((jkey) => {
					return [jkey, routesTree[key][jkey]];
				});

				acc[key] = tuples as unknown as RouteTuple;

				return acc;
			}, {} as { [key: string]: RouteTuple }); // TODO: fix this temporary TMP mess TMPRouteTree => routesTree

			const routesTreeKeys = Object.keys(TMPRouteTree).sort((a, b) =>
				TMPRouteTree[a][0][0].localeCompare(TMPRouteTree[b][0][0])
			); // todo: changed here

			const routesElements = await Promise.all(
				routesTreeKeys.map(
					async (key) =>
						await Promise.all(
							// todo: changed here
							TMPRouteTree[key].map(async (routeTuple) => {
								const slug = key === "frontpage" ? "index" : key;

								try {
									const [path, endpoint] = routeTuple;

									const { default: page } = await import(
										`@views/pages/${slug}`
									);

									return (
										<Route
											key={path}
											path={path}
											element={<View endpoint={endpoint} page={page} />}
										/>
									);
								} catch (e) {
									console.log(
										createErrorString({
											path: "💢: something went wrong in 'core > front > pages.tsx'",
											message: `😢: failed to import ${slug}.tsx file`,
										})
									);

									return null;
								}
							})
						)
				)
			);

			setRoutes(routesElements);
		},
	});

	if (error) return <ErrorResponse status={500} />;
	if (!data) return null; // todo implement loading layout system

	return <Routes>{routes}</Routes>;
};

export default Page;
