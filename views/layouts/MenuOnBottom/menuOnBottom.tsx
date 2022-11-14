import Header from "../../components/Header/header";

export const MenuOnBottom: Layout = ({ children }) => {
	return (
		<div>
			{children}
			<Header />
		</div>
	);
};
