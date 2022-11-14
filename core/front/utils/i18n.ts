import i18next, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { getServerData } from "./getServerData";
import appConfig from "@config/app.json";

const serverSettings = getServerData(appConfig.settings.element.id);

const i18n = i18next.createInstance();

const translationImports = await Promise.all(
  serverSettings.langs.map(async (lang: string) => {
    try {
      const { default: translation } = await import(
        `./../../../translations/${lang}.json`
      ); // todo change with @import

      return {
        [lang]: {
          translation,
        },
      };
    } catch (e) {
      console.warn(e);
    }
  })
);

const translations = translationImports.reduce((acc, language) => {
  return { ...acc, ...language };
}, {});

console.log(translations);

const config: InitOptions = {
  detection: {
    order: ["path"],
  },
  supportedLngs: serverSettings.langs,
  fallbackLng: serverSettings.fallbackLang,
  debug: true,
  resources: {
    ...translations,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...config,
  });

export { i18n };
