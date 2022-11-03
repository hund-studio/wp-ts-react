import { MenuOnBottom } from "../layouts/menuOnBottom/MenuOnBottom";

const Project: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Project</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

Project.layout = MenuOnBottom;

export default Project;
