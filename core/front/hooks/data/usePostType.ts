import { AxiosRequestConfig } from "axios";
import { context } from "./../../context/data";
import { fetcher } from "../../utils/fetcher";
import { useContext } from "react";
import useSWR from "swr";

function usePostType(params: AxiosRequestConfig["params"] = undefined) {
	const { value } = useContext(context);

	const { post_type, ...rest } = params;

	const { data, error } = useSWR(
		[`/post-type/${post_type || value?.post_type || ""}`, rest],
		fetcher
	);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
}

export { usePostType };