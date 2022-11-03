import { createContext, FC, PropsWithChildren, useState } from "react";

const context = createContext<WPReactDataContext>(undefined!);

const Provider: FC<PropsWithChildren> = ({ children }) => {
	const [value, set] = useState();

	return <context.Provider value={{ value, set }}>{children}</context.Provider>;
};

export { context, Provider };
