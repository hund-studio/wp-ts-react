import { FC } from "react";
import { Langs } from "../Langs/langs";
import Nav from "../Nav/nav";

const Header: FC = () => {
  return (
    <header>
      <Nav menuId="primary" />
      <Langs />
    </header>
  );
};

export default Header;
