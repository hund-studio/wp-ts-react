import { useContext } from "react";
import { context as dataContext } from "./../../context/data";

const useData = () => useContext(dataContext).value;

export { useData };
