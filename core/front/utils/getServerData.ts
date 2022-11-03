const getServerData = (elementId: string) => {
	const dataElement = document.getElementById(elementId);

	const serverData = dataElement?.textContent
		? JSON.parse(dataElement.textContent)
		: {};

	return serverData;
};

export { getServerData };
