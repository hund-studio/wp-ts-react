import { context } from "core/front/context/data";
import { useContext } from "react";

const useAuth = () => {
	const usedContext = useContext(context);
	return { ...usedContext };
};

export { useAuth };
