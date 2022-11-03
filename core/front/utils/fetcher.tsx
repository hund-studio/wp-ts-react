import axios from "axios";

const fetcher = (url: string) => {
	return axios.get(API_URL + url).then(({ data }) => {
		return data;
	});
};

export { fetcher };
