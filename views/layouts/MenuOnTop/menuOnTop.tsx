import Header from "../../components/Header/header";

export const MenuOnTop: Layout = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};
