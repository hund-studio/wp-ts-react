import axios from "axios";
import {
	createContext,
	FC,
	PropsWithChildren,
	useEffect,
	useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const context = createContext<WPReactContextAuth>(undefined!);

const getLocalJTW = () => localStorage.getItem("JWT");
const setLocalJTW = (jwt: string) => localStorage.setItem("JWT", jwt);

const Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [user, setUser] = useState<WPReactContextAuth["user"]["value"]>();
	const [JWT, setJWT] = useState<WPReactContextAuth["JWT"]["value"]>(
		getLocalJTW()
	);

	useEffect(() => {
		if (!user) return;
		const from = searchParams.get("from");
		return from ? navigate(from) : navigate("/");
	}, [user]);

	useEffect(() => {
		if (JWT) setLocalJTW(JWT);
		const storedJWT = getLocalJTW();

		if (!storedJWT) return;

		axios
			.get(API_URL + "/?rest_route=/simple-jwt-login/v1/auth/validate", {
				params: {
					JWT,
				},
			})
			.then(({ data: result }) => setUser(result.data))
			.catch((e) => console.error(e));
	}, [JWT]);

	return (
		<context.Provider
			value={{
				user: { value: user, set: setUser },
				JWT: { value: JWT, set: setJWT },
			}}>
			{children}
		</context.Provider>
	);
};

export { context, Provider };
