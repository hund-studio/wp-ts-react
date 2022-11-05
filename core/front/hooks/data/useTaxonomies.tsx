import { AxiosRequestConfig } from "axios";
import { context } from "../../context/data";
import { fetcher } from "../../utils/fetcher";
import { useContext } from "react";
import useSWR from "swr";

function useTaxonomies(params: AxiosRequestConfig["params"] = undefined) {
	const { value } = useContext(context);

	const { data, error } = useSWR(
		[`/taxonomies`, { post_type: value.post_type, ...params }],
		fetcher
	);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
}

export { useTaxonomies };
