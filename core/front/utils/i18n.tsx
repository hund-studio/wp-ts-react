import _ from "lodash";
import { getServerData } from "./getServerData";
import { handleError } from "./handleError";
import { initReactI18next } from "react-i18next";
import appConfig from "@config/app.json";
import createHttpError from "http-errors";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import type { InitOptions } from "i18next";
import useSWR from "swr";
import { fetcher } from "./fetcher";
import axios from "axios";

/* The `LangSettings` interface defines the structure of an object that contains language settings. It
specifies that the object must have three properties: `apiUrl`, which is a string representing the
URL of the API used to retrieve translations; `langs`, which is an array of strings representing the
supported languages; and `fallbackLang`, which is a string representing the fallback language to use
if a translation is not available in the requested language. This interface is used to validate that
the `langSettings` object passed to the `assertsLangSettings` function has the correct structure. */
interface LangSettings {
	apiUrl: string;
	langs: string[];
	fallbackLang: string;
}

/**
 * The function asserts that a given object has valid language settings and throws an error if any of
 * the settings are invalid.
 * @param {any} langSettings - an object containing language settings, including apiUrl (string), langs
 * (array of strings), and fallbackLang (string).
 */
function assertsLangSettings(
	langSettings: any
): asserts langSettings is LangSettings {
	if (_.isUndefined(langSettings)) {
		throw createHttpError(400, `'langSettings' is undefined`);
	}

	const { apiUrl, langs, fallbackLang } = langSettings;

	if (!_.isString(apiUrl)) {
		throw createHttpError(400, `'apiUrl' must be string`);
	}

	if (!_.isArray(langs) || !_.every(langs, _.isString)) {
		throw createHttpError(400, `'langs' must be string[]`);
	}

	if (!_.isString(fallbackLang)) {
		throw createHttpError(400, `fallbackLang must be string`);
	}
}

/**
 * This function creates an instance of i18next and initializes it with translations and language
 * settings obtained from the server.
 * @returns The `getI18nInstance` function returns an instance of the `i18next` library that has been
 * initialized with configuration options and loaded with translations for the supported languages. The
 * function uses async/await and Promise.all to load translations for each supported language from the
 * `translations` directory. If an error occurs during the loading of a translation file, a warning is
 * logged to the console and the
 */
const getI18nInstance = async () => {
	const serverSettings = getServerData(appConfig.settings.element.id);
	const { data: fetchedSettings } = await axios.get(
		`${TARGET_HOST}/${API_NAMESPACE}/settings`
	);

	const serverLangSettings = serverSettings || fetchedSettings;

	console.log(serverLangSettings);

	const i18n = i18next.createInstance();

	i18n.use(LanguageDetector).use(initReactI18next);

	const DEFAULT_OPTIONS: InitOptions = {
		detection: {
			order: ["path"],
		},
		debug: TARGET !== "production",
		supportedLngs: [appConfig.language],
		fallbackLng: appConfig.language,
	};

	try {
		console.log("ghiaccio");
		assertsLangSettings(serverLangSettings);

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
							handleError(e, `'core/front/utils/i18n.tsx'`, "warn");
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

		i18n.init({
			...DEFAULT_OPTIONS,
			supportedLngs: serverLangSettings.langs,
			fallbackLng: serverLangSettings.fallbackLang,
			resources: {
				...translations,
			},
		});
	} catch (e: unknown) {
		console.log("ciccio");
		handleError(e, `'core/front/utils/i18n.tsx'`, "warn");

		i18n.init({ ...DEFAULT_OPTIONS });
	} finally {
		return i18n;
	}
};

export { getI18nInstance };
