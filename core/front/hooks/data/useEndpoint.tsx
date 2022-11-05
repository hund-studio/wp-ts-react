import { context } from "./../../context/data";
import { fetcher } from "./../../utils/fetcher";
import { useContext } from "react";
import useSWR from "swr";

function useEndpoint(endpoint: string) {
	const { set } = useContext(context);

	const { data, error } = useSWR(endpoint, fetcher, {
		onSuccess: (data) => set(data),
	});

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
}

export { useEndpoint };
