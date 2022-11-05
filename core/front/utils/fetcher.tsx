import axios, { AxiosRequestConfig } from "axios";

const fetcher = (url: string, params: AxiosRequestConfig["params"]) => {
	return axios
		.get(API_URL + url, {
			params,
		})
		.then(({ data }) => {
			return data;
		});
};

export { fetcher };
