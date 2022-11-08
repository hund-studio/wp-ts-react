import { MenuOnTop } from "@views/layouts/MenuOnTop/menuOnTop";

const SpecialTemplate: Page = ({ data }: any) => {
	return (
		<main>
			<h1>This page uses a Special Template</h1>
			<p>
				This page uses the
				<mark>
					<code>special-template.tsx</code>
				</mark>
				template.
			</p>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

SpecialTemplate.layout = MenuOnTop;

export default SpecialTemplate;
