import _ from "lodash";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { FC, Fragment, PropsWithChildren, Suspense } from "react";
import { fetchAndSuspend } from "./utils/fetchAndSuspend";
import { getI18nInstance } from "./utils/i18n";
import { handleError } from "./utils/handleError";
import { I18nextProvider } from "react-i18next";
import { ModeFlag } from "./components/ModeFlag/modeFlag";
import { Provider as DataProvider } from "./context/data";
import useSWR, { SWRConfig } from "swr";
import { useScrollTop } from "./hooks/layout/useScrollTop";
import createHttpError from "http-errors";
import { fetcher } from "./utils/fetcher";
import { getServerData } from "./utils/getServerData";
import appConfig from "@config/app.json";

try {
	/* `const { default: _App } = await import("@views/pages/_app");` is importing the default export from
  the `_app.tsx` file located in the `@views/pages` directory and assigning it to a constant variable
  named `_App`. The `await` keyword is used because the import statement is asynchronous and returns
  a promise. The object destructuring syntax is used to extract the default export from the imported
  module and rename it to `_App`. */
	const { default: _App } = await import("@views/pages/_app");

	/* `const DEFAULT_APP_CONFIG` is creating an object with a single property `resetScroll` set to
  `true`. This object represents the default configuration for the app. */
	const DEFAULT_APP_CONFIG = {
		resetScroll: true,
	};

	/* `const APP_CONFIG = { ...DEFAULT_APP_CONFIG, ..._App.config };` is creating a new object
  `APP_CONFIG` by merging two objects `DEFAULT_APP_CONFIG` and `_App.config`. The spread operator
  `...` is used to spread the properties of both objects into the new object. If there are any
  overlapping properties, the values from `_App.config` will overwrite the values from
  `DEFAULT_APP_CONFIG`. This allows for the customization of the default app configuration by the
  `_App` component. */
	const APP_CONFIG = { ...DEFAULT_APP_CONFIG, ..._App.config };

	/**
	 * This is a functional component that conditionally resets the scroll position and renders its
	 * children.
	 * @param  - - `const`: a keyword used to declare a constant variable
	 * @returns The `AppConfig` component is being returned, which takes in a `PropsWithChildren` object
	 * as a parameter and renders its `children` prop within a `Fragment`. If `APP_CONFIG.resetScroll` is
	 * true, it also calls the `useScrollTop` hook.
	 */
	const AppConfig: FC<PropsWithChildren> = ({ children }) => {
		if (APP_CONFIG.resetScroll) {
			useScrollTop();
		}

		return <Fragment>{children}</Fragment>;
	};

	const resource = fetchAndSuspend(getI18nInstance);

	/**
	 * This is a functional component that sets up an i18n instance and provides it to its children using
	 * a conditional provider.
	 * @param  - - `AppLanguage`: This is a functional component that renders the children components with
	 * the help of the `ConditionalI18nextProvider` component.
	 * @returns The `AppLanguage` component is being returned. It takes in a `PropsWithChildren` object as
	 * a parameter and returns a `ConditionalI18nextProvider` component with the `i18n` prop set to the
	 * value of the `i18n` state variable. The `i18n` state variable is set using the `useState` hook and
	 * the `getI18nInstance
	 */
	const AppLanguage: FC<PropsWithChildren> = ({ children }) => {
		const i18n = resource.read();

		if (!i18n) {
			return null;
		}

		return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
	};

	/**
	 * This is a functional component that renders a hierarchy of components for a TypeScript React
	 * application.
	 * @returns The `App` component is being returned, which is a functional component that renders a tree
	 * of nested components. The outermost component is `AppLanguage`, followed by `SWRConfig`,
	 * `DataProvider`, `BrowserRouter`, `AppConfig`, `ModeFlag`, and finally `_App`.
	 */
	const App: FC = () => {
		return (
			<Suspense fallback={<p>Waiting for connection data</p>}>
				<SWRConfig>
					<AppLanguage>
						<DataProvider>
							<BrowserRouter>
								<AppConfig>
									<ModeFlag />
									<_App />
								</AppConfig>
							</BrowserRouter>
						</DataProvider>
					</AppLanguage>
				</SWRConfig>
			</Suspense>
		);
	};

	/**
	 * This function creates a root element in the HTML document and renders a React component called
	 * "App" inside it.
	 */
	const main = () => {
		const container = document.getElementById("root");

		if (!container) {
			createHttpError(500);
		}

		const root = createRoot(container!);

		root.render(<App />);
	};

	/* `main();` is calling the `main` function, which creates a root element in the HTML document and
  renders a React component called "App" inside it. */
	main();
} catch (e) {
	handleError(e, "'core/front/index.tsx'", "error");
}
