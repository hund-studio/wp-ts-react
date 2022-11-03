import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollTop = () => {
	const location = useLocation();

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
};

export { useScrollTop };
