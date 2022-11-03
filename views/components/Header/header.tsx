import { FC } from "react";
import Nav from "../Nav/nav";

const Header: FC = () => {
	return (
		<header>
			<Nav menuId='primary-menu' />
		</header>
	);
};

export default Header;
