import { FC, PropsWithChildren } from "react";

interface TextProps {}

const Text: FC<PropsWithChildren<TextProps>> = ({ children }) => {
	return <div className={"lg-textformat-parent"}>{children}</div>;
};

export { Text };
