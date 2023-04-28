import _ from "lodash";
import { handleError } from "./handleError";
import createHttpError from "http-errors";

const getServerData = (elementId: string) => {
	try {
		const dataElement = document.getElementById(elementId);

		if (!dataElement?.textContent) {
			throw createHttpError(404, `#${elementId} not found`);
		}

		return JSON.parse(dataElement.textContent);
	} catch (e) {
		handleError(e, "'core/front/utils/getServerData.ts'", "warn");
	}
};

export { getServerData };
