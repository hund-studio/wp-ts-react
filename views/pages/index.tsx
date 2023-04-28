import { T } from "@core/lang/T";
import { Link } from "@core/Link";
import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";
import { useTranslation } from "react-i18next";

const Index: Page = ({ data }: any) => {
	const { i18n, t } = useTranslation();

	return (
		<main>
			<h1>
				<T tkey={"frontpage"}>Homepage</T>
			</h1>
			<p>
				This is a text with a <Link to='https://hund.studio'>link</Link>
			</p>
			<code>
				Wordpress site language: {i18n.languages.join(", ")}
				<br />
				Fallback languages: {i18n.options.fallbackLng?.toString()}
			</code>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Index.layout = MenuOnBottom;

export default Index;
