import { useContext } from "react";
import { context as dataContext } from "./../../context/data";

function useData() {
	const { value } = useContext(dataContext);

	return { data: value };
}

export { useData };
