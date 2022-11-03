import { fetcher } from "./../../utils/fetcher";
import useSWR from "swr";

const useOptions = () => {
	const { data, error } = useSWR(`/options`, fetcher);

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
};

export { useOptions };
