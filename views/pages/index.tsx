import { Link } from "@core/Link";
import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";
import { useTranslation } from "react-i18next";

const Index: Page = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t("frontpage")}</h1>
      <p>
        This is a text with a <Link to="https://hund.studio">link</Link>
      </p>
      <input type={"text"} value={data?.acf?.body} disabled />
    </main>
  );
};

Index.layout = MenuOnBottom;

export default Index;
