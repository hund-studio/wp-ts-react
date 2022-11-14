import { Link } from "@core/Link";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const Langs: FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <nav>
      <ul>
        <li>
          <Link lang={"it"}>IT</Link>
        </li>
        <li>
          <Link lang={"en"}>EN</Link>
        </li>
      </ul>
    </nav>
  );
};

export { Langs };
