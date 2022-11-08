import { FC } from "react";
import Nav from "../Nav/nav";

const Header: FC = () => {
	return (
		<header>
			<Nav menuId='primary' />
		</header>
	);
};

export default Header;
