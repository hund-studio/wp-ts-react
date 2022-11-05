import { MenuOnBottom } from "@views/layouts/menuOnBottom/MenuOnBottom";

const Page: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Page</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Page.layout = MenuOnBottom;

export default Page;
