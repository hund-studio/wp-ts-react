import { fetcher } from "./../../utils/fetcher";
import useSWR from "swr";

function useEndpoint(endpoint: string) {
	const { data, error } = useSWR(endpoint, fetcher);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
}

export { useEndpoint };
