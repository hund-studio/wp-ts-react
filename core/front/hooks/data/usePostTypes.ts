import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

const usePostTypes = () => {
	const { i18n } = useTranslation();

	const lang = i18n.language;
	const defaultLang = Array.isArray(i18n.options.fallbackLng)
		? i18n.options.fallbackLng
		: []; // todo should be useLang hook

	const { data, error } = useSWR(
		lang && !defaultLang.includes(lang)
			? `/${i18n.language}/${API_NAMESPACE}/post-types`
			: `/${API_NAMESPACE}/post-types`,
		fetcher
	);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};

export { usePostTypes };
