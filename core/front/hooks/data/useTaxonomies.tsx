import { AxiosRequestConfig } from "axios";
import { context } from "../../context/data";
import { fetcher } from "../../utils/fetcher";
import { useContext } from "react";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

function useTaxonomies(params: AxiosRequestConfig["params"] = undefined) {
	const { i18n } = useTranslation();

	const lang = i18n.language;
	const defaultLang = Array.isArray(i18n.options.fallbackLng)
		? i18n.options.fallbackLng
		: []; // todo should be useLang hook

	const { value } = useContext(context);

	const { data, error } = useSWR(
		[
			lang && !defaultLang.includes(lang)
				? `/${i18n.language}/${API_NAMESPACE}/taxonomies`
				: `/${API_NAMESPACE}/taxonomies`,
			{ post_type: value.post_type, ...params },
		],
		fetcher
	);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
}

export { useTaxonomies };
