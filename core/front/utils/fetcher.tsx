import axios, { AxiosRequestConfig } from "axios";

const fetcher = (url: string, params: AxiosRequestConfig["params"]) => {
  return axios
    .get(TARGET_HOST + url, {
      params,
    })
    .then(({ data }) => {
      return data;
    });
};

export { fetcher };
