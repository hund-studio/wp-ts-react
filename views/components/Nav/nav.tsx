import { FC } from "react";
import { useMenus } from "@core/hooks";
import { Link } from "react-router-dom";

const Nav: FC<{ menuId: string }> = ({ menuId }) => {
	const { data, isLoading, isError } = useMenus();

	if (isLoading) return null;
	if (isError) return null;
	if (!data) return null;

	if (!(menuId in data)) {
		console.error("Menu ID not found");
		return null;
	}

	const menu = data[menuId];

	if (!menu.length) {
		console.warn("This menu is empty");
		return null;
	}

	return (
		<nav>
			<ul>
				{menu.map((item, index) => (
					<li key={index}>
						<Link to={item.url}>{item.title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Nav;
