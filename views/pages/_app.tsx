import { Fragment } from "react";
import Page from "@core/page";

import "./../styles/global.scss";

const App: WPReactApp = () => {
	return (
		<Fragment>
			<Page />
		</Fragment>
	);
};

App.config = {
	resetScroll: true,
};

export default App;
