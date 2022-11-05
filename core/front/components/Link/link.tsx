import { FC } from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";

const Link: FC<LinkProps> = ({ to, ...props }) => {
	const isExternalTo =
		typeof to === "string" &&
		["http://", "https://"].some((prefix) => to.startsWith(prefix));

	return isExternalTo ? (
		<a href={to} {...props} />
	) : (
		<RouterLink to={to} {...props} />
	);
};

export { Link };
