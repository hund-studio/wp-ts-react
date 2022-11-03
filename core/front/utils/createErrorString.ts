interface ErrorContent {
	path: string;
	message: string;
}

const createErrorString = (errorContent: ErrorContent) => {
	return Object.values(errorContent).join("\n");
};

export { createErrorString };
