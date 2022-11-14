import { T } from "@core/lang/T";
import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";

const Page: Page = ({ data }: any) => {
	return (
		<main>
			<h1>
				<T tkey={"page"}>Page</T>
			</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Page.layout = MenuOnBottom;

export default Page;
