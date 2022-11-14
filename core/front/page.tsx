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

const createRouteFromDefinition = async (
	routeDefinition: WPReactRouteDefinition
) => {
	const [fileName, path, endpoint] = routeDefinition;

	const splittedFileName = fileName.split(":");
	const validTemplateNames = splittedFileName
		.map((name, index) => {
			const partialName = splittedFileName.slice(0, index + 1).join(":");
			return partialName;
		})
		.reverse();

	for (let index = 0; index < validTemplateNames.length; index++) {
		try {
			const { default: page } = await import(
				`@views/pages/${validTemplateNames[index]}`
			);

			return (
				<Route
					key={path}
					path={path}
					element={<View endpoint={endpoint} page={page} />}
				/>
			);
		} catch (e) {
			continue;
		}
	}

	console.log(
		createErrorString({
			path: "💢: something went wrong in 'core > front > pages.tsx'",
			message: `😢: failed to import ${fileName}.tsx file`,
		})
	);

	return null;
};

const recursivelyLoadRoutesTree = async (
	templateName: string,
	routesTree: WPReactTemplateTree
): Promise<ReactNode> =>
	await Promise.all(
		Object.keys(routesTree).map(async (key) => {
			const routesCollection = routesTree[key];

			if (typeof routesCollection === "string") {
				const slug = templateName === "frontpage" ? "index" : templateName;

				return await createRouteFromDefinition([slug, key, routesCollection]);
			} else {
				return await recursivelyLoadRoutesTree(
					`${templateName}:${key}`,
					routesCollection
				);
			}
		})
	);

const Page: FC = () => {
	const [routes, setRoutes] = useState<ReactNode>();

	const { data, error } = useSWR<WPReactRoutesTree>(
		[`/${API_NAMESPACE}/routes`],
		fetcher,
		{
			fallbackData: getServerData(appConfig.routes.element.id),
			onSuccess: async (routesTree, _key, _config) => {
				const routesElements = await Promise.all(
					Object.keys(routesTree).map(async (templateName) => {
						return await recursivelyLoadRoutesTree(
							templateName,
							routesTree[templateName]
						);
					})
				);

				setRoutes(routesElements);
			},
		}
	);

	if (error) return <ErrorResponse status={500} />;
	if (!data) return null; // todo implement loading layout system

	return <Routes>{routes}</Routes>;
};

export default Page;
