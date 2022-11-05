import { fetcher } from "../../utils/fetcher";
import useSWR from "swr";

const usePostTypes = () => {
	const { data, error } = useSWR(`/post-types`, fetcher);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};

export { usePostTypes };
