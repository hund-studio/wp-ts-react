type JWTValue = string | null;
type WPUserValue = WPUser | undefined;

interface WPReactContextAuth {
	user: {
		value: WPUserValue;
		set: React.Dispatch<React.SetStateAction<WPUserValue>>;
	};
	JWT: {
		value: JWTValue;
		set: React.Dispatch<React.SetStateAction<JWTValue>>;
	};
}
