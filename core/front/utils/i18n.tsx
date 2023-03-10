import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { getServerData } from "./getServerData";
import appConfig from "@config/app.json";
import _ from "lodash";
import { FC, Fragment, PropsWithChildren } from "react";
import { I18nextProvider, I18nextProviderProps } from "react-i18next";

type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface LangSettings {
  apiUrl: string;
  langs: string[];
  fallbackLang: string;
}

function assertsLangSettings(
  langSettings: any
): asserts langSettings is LangSettings {
  if (_.isUndefined(langSettings)) {
    throw `langSettings is undefined`;
  }

  const { apiUrl, langs, fallbackLang } = langSettings;

  if (!_.isString(apiUrl)) {
    throw `apiUrl must be string`;
  }

  if (!_.isArray(langs) || !_.every(langs, _.isString)) {
    throw `langs must be string[]`;
  }

  if (!_.isString(fallbackLang)) {
    throw `fallbackLang must be string`;
  }
}

const getI18nInstance = async () => {
  try {
    const serverLangSettings = getServerData(appConfig.settings.element.id);

    assertsLangSettings(serverLangSettings);

    const i18n = i18next.createInstance();

    const translations = (
      await Promise.all(
        serverLangSettings.langs.map(
          async (
            lang: string
          ): Promise<[string, { translation: any }] | undefined> => {
            try {
              const { default: translation } = await import(
                `../../../translations/${lang}`
              );

              return [lang, { translation }];
            } catch (e) {
              console.warn(e);
            }
          }
        )
      )
    )
      .flatMap((i) => (!!i ? [i] : []))
      .reduce(
        (obj: { [key: string]: { translation: any } }, item) =>
          (obj[item[0]] = item[1]),
        {}
      );

    const config: InitOptions = {
      detection: {
        order: ["path"],
      },
      supportedLngs: serverLangSettings.langs,
      fallbackLng: serverLangSettings.fallbackLang,
      debug: true,
      resources: {
        ...translations,
      },
    };

    return i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        ...config,
      });
  } catch (e) {
    console.warn(e);
    return;
  }
};

const ConditionalI18nextProvider: FC<
  PropsWithChildren<PartiallyOptional<I18nextProviderProps, "i18n">>
> = ({ children, i18n, ...rest }) => {
  if (!i18n) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <I18nextProvider i18n={i18n} {...rest}>
      {children}
    </I18nextProvider>
  );
};

export { getI18nInstance, ConditionalI18nextProvider };
