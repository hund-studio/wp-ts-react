import { FC, Fragment, PropsWithChildren } from "react";
import { useParams } from "react-router-dom";
import format from "string-template";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import ErrorResponse from "./templates/ErrorPage/errorPage";
import { useEndpoint } from "./hooks/data/useEndpoint";

export const View: FC<{
	endpoint: string;
	page: Page;
}> = ({ endpoint, page: Page }) => {
	const { slug } = useParams();
	const { data, isLoading, isError } = useEndpoint(format(endpoint, { slug }));

	const errorResponseStatus = data?.data?.status;

	if (isError) return null;

	if (isLoading) return null;

	if (errorResponseStatus)
		return <ErrorResponse status={errorResponseStatus} />;

	return (
		<Fragment>
			{data?.seo?.data?.head && <Helmet>{parse(data.seo.data.head)}</Helmet>}

			<PageWithLayout layout={Page.layout}>
				<Page data={data} />
			</PageWithLayout>
		</Fragment>
	);
};

const PageWithLayout: FC<PropsWithChildren<{ layout?: Layout }>> = ({
	layout: Layout,
	children,
}) => {
	return Layout ? (
		<Layout page={children}>{children}</Layout>
	) : (
		<Fragment>{children}</Fragment>
	);
};
