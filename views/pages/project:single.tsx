import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";

const ProjectSingle: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Single Project page</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

ProjectSingle.layout = MenuOnBottom;

export default ProjectSingle;
