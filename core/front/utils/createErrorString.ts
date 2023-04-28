interface Message {
	icon: string;
	path: string;
	message: string;
}

const createDebugString = (errorContent: Message) => {
	return Object.values(errorContent).join("\n");
};

export { createDebugString };
