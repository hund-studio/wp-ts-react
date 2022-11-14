import Header from "../../components/Header/header";

export const MenuOnTop: Layout = ({ page }) => {
  return (
    <div>
      <Header />
      {page}
    </div>
  );
};
