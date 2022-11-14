import { fetcher } from "./../../utils/fetcher";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

const useOptions = () => {
	const { i18n } = useTranslation();

	const lang = i18n.language;
	const defaultLang = Array.isArray(i18n.options.fallbackLng)
		? i18n.options.fallbackLng
		: []; // todo should be useLang hook

	const { data, error } = useSWR<any>(
		lang && !defaultLang.includes(lang)
			? `/${i18n.language}/${API_NAMESPACE}/options`
			: `/${API_NAMESPACE}/options`,
		fetcher
	);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};

export { useOptions };
