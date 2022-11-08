import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";

const ProjectArchive: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Archive Project page</h1>
			<input type={"text"} value={data?.acf?.body} disabled />
		</main>
	);
};

ProjectArchive.layout = MenuOnBottom;

export default ProjectArchive;
