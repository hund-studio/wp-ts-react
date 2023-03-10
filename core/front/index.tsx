import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { FC, Fragment, PropsWithChildren, useEffect, useState } from "react";
import { ModeFlag } from "./components/ModelFlag/modeFlag";
import { Provider as DataProvider } from "./context/data";
import { SWRConfig } from "swr";
import { useScrollTop } from "./hooks/layout/useScrollTop";
import { createErrorString } from "./utils/createErrorString";
import { I18nextProviderProps } from "react-i18next";
import { ConditionalI18nextProvider, getI18nInstance } from "./utils/i18n";

const defaultAppConfig = {
  resetScroll: true,
};

try {
  const { default: _App } = await import("@views/pages/_app");

  _App.config = { ...defaultAppConfig, ..._App.config };

  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    if (_App.config?.resetScroll) useScrollTop();
    return <Fragment>{children}</Fragment>;
  };

  const App: FC = () => {
    const [i18n, setI18n] = useState<I18nextProviderProps["i18n"]>();

    useEffect(() => {
      getI18nInstance().then((data) => setI18n(data));
    }, []);

    return (
      <ConditionalI18nextProvider i18n={i18n}>
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
      </ConditionalI18nextProvider>
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
