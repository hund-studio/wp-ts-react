import { MenuOnBottom } from "@views/layouts/menuOnBottom/MenuOnBottom";
import { Link } from "react-router-dom";

const Index: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Index</h1>
			<p>
				This is a text with a <Link to='https://hund.studio'>link</Link>
			</p>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Index.layout = MenuOnBottom;

export default Index;
