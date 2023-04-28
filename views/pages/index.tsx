import { T } from "@core/lang/T";
import { Link } from "@core/Link";
import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";
import { useTranslation } from "react-i18next";

const Index: Page = ({ data }: any) => {
	const { i18n, t } = useTranslation();

	return (
		<main>
			<h1>{data["post_title"]}</h1>
			<h2>
				<T tkey={"hello"}>Hello</T>
			</h2>
			<p>
				Welcome to WPreact, a product by{" "}
				<Link to='https://hund.studio' target='_blank'>
					hund.studio
				</Link>
			</p>
			<code>
				Available language: {i18n.languages.join(", ")}
				<br />
				Fallback language: {i18n.options.fallbackLng?.toString()}
				<br />
				Current language: {i18n.language}
			</code>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Index.layout = MenuOnBottom;

export default Index;
