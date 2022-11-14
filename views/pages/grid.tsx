import { LayGrid } from "@core/lay/Grid";
import { LayText } from "@core/lay/Text";
import { MenuOnTop } from "@views/layouts/MenuOnTop/menuOnTop";

const Grid: Page = ({ data }: any) => {
	return (
		<main>
			<h1>Grid</h1>
			<LayText>
				<p>This uses the default laygridder text format</p>
			</LayText>
			<LayGrid />
		</main>
	);
};

Grid.layout = MenuOnTop;

export default Grid;
