import { MenuOnBottom } from "@views/layouts/MenuOnBottom/menuOnBottom";
import { useTranslation } from "react-i18next"; // todo this should be exported from core somehow

const Page: Page = ({ data }: any) => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t("page")}</h1>
      <input type={"text"} value={data?.acf?.body} disabled />
    </main>
  );
};

Page.layout = MenuOnBottom;

export default Page;
