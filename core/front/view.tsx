import { FC, Fragment, PropsWithChildren, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import format from "string-template";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import ErrorResponse from "./templates/ErrorPage/errorPage";
import { useEndpoint } from "./hooks/data/useEndpoint";
import { context } from "./context/data";
import { useTranslation } from "react-i18next";

const PageWithLayout: FC<PropsWithChildren<{ layout?: Layout }>> = ({
	layout: Layout,
	children,
}) => {
	return Layout ? <Layout>{children}</Layout> : <Fragment>{children}</Fragment>;
};

export const View: FC<{
	endpoint: string;
	page: Page;
}> = ({ endpoint, page: Page }) => {
	const { set } = useContext(context);

	const prevData = useRef<{
		Page?: Page;
		data?: any;
	}>({});

	const { slug } = useParams();
	const { data, isLoading, isError } = useEndpoint(
		format(endpoint, { slug }),
		(data) => {
			prevData.current.Page = Page;
			prevData.current.data = data;
			set(data);
		}
	);

	const errorResponseStatus = data?.data?.status;

	if (isError) {
		return null;
	}

	if (isLoading) {
		const { data, Page } = prevData.current;

		if (!data) return null;
		if (!Page) return null;

		return (
			<Fragment>
				{data?.seo?.data?.head && <Helmet>{parse(data.seo.data.head)}</Helmet>}

				<PageWithLayout layout={Page.layout}>
					<Page data={data} />
				</PageWithLayout>
			</Fragment>
		);
	}

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
