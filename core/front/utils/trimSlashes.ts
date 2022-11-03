const trimSlashes = (string: string) =>
	string
		.split("/")
		.filter((v) => v !== "")
		.join("/");

export { trimSlashes };
