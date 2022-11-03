import Header from "../../components/Header/header";

export const MenuOnBottom: Layout = ({ page }) => {
	return (
		<div>
			{page}
			<Header />
		</div>
	);
};
