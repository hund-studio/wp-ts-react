import { context } from "./../../context/data";
import { fetcher } from "./../../utils/fetcher";
import { useContext, useRef } from "react";
import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/dist/types";

type onSuccessCallback =
	| ((
			data: any,
			key: string,
			config: Readonly<PublicConfiguration<any, any, BareFetcher<any>>>
	  ) => void)
	| undefined;

function useEndpoint(endpoint: string, onSuccess: onSuccessCallback) {
	const { data, error } = useSWR(endpoint, fetcher, {
		onSuccess,
	});

	return {
		data,
		isLoading: !error && !data,
		isError: error,
	};
}

export { useEndpoint };
