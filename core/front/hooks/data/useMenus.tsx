import { fetcher } from "./../../utils/fetcher";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import _ from "lodash";

const useMenus = () => {
	const { i18n } = useTranslation();

	const lang = i18n.language;
	const defaultLang = _.isArray(i18n.options?.fallbackLng)
		? i18n.options.fallbackLng
		: [];

	const { data, error } = useSWR<{ [key: string]: MenuItem[] }>(
		lang && !defaultLang.includes(lang)
			? `/${i18n.language}/${API_NAMESPACE}/menus`
			: `/${API_NAMESPACE}/menus`,
		fetcher
	);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};

export { useMenus };
