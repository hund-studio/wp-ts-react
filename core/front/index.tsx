import { BrowserRouter } from "react-router-dom";
import { cacheProvider } from "./utils/cache";
import { createRoot } from "react-dom/client";
import { FC, Fragment, PropsWithChildren } from "react";
import { ModeFlag } from "./components/ModelFlag/modeFlag";
import { Provider as DataProvider } from "./context/data";
import { SWRConfig } from "swr";
import { useScrollTop } from "./hooks/layout/useScrollTop";
import { createErrorString } from "./utils/createErrorString";

try {
	const { default: _App } = await import("@views/pages/_app");

	const Wrapper: FC<PropsWithChildren> = ({ children }) => {
		useScrollTop();
		return <Fragment>{children}</Fragment>;
	};

	const App: FC = () => {
		return (
			// <SWRConfig value={{ provider: cacheProvider }}>
			<SWRConfig>
				<DataProvider>
					<BrowserRouter>
						<Wrapper>
							<ModeFlag />
							<_App />
						</Wrapper>
					</BrowserRouter>
				</DataProvider>
			</SWRConfig>
		);
	};

	const container = document.getElementById("root");
	const root = createRoot(container!);

	root.render(<App />);
} catch (e) {
	console.log(
		createErrorString({
			path: "💢: something went wrong in 'core > front > index.tsx'",
			message: "😢: failed to import _app.tsx file",
		})
	);
}
