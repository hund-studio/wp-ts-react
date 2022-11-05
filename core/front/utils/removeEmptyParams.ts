import { AxiosRequestConfig } from "axios";

const removeEmptyParams = (params: AxiosRequestConfig["params"]) => {
	Object.keys(params).forEach((key) => {
		if (params[key] === null) delete params[key];
		if (typeof params[key] === "string" && params[key].trim().length === 0)
			delete params[key];
		if (Array.isArray(params[key]) && !params[key].length) delete params[key];
	});

	return { ...params };
};

export { removeEmptyParams };
