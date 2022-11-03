import { fetcher } from "./../../utils/fetcher";
import useSWR from "swr";

const usePostType = () => {
	const { data, error } = useSWR(`/post-type`, fetcher);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};

export { usePostType };
