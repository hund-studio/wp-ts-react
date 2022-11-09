import { Laygrid } from "@core/Laygrid";
import { MenuOnTop } from "@views/layouts/MenuOnTop/menuOnTop";

const Grid: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Grid</h1>
			<Laygrid />
		</main>
	);
};

Grid.layout = MenuOnTop;

export default Grid;
