import createHttpError, { isHttpError } from "http-errors";
import { createDebugString } from "./createErrorString";
import _ from "lodash";

const ICON = {
	error: `🐞`,
	warn: `🚸`,
	log: `📢`,
};

const handleError = (
	e: unknown,
	path: string,
	type: "warn" | "error" | "log"
) => {
	if (_.isError(e) || isHttpError(e)) {
		console[type](
			createDebugString({
				icon: ICON[type],
				path: `💢: something went wrong in ${path}`,
				message: `😢: ${e.message}`,
			})
		);
	} else {
		const error = createHttpError(500);
		console[type](
			createDebugString({
				icon: ICON[type],
				path: `💢: something went wrong in ${path}`,
				message: `😢: ${error.message}`,
			})
		);
	}
};

export { handleError };
