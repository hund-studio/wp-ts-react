import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

interface TProps {
	tkey?: string;
	children: string;
}

const T: FC<TProps> = ({ tkey, children }) => {
	const { t } = useTranslation();

	if (!tkey) return <Fragment>{children}</Fragment>;

	const translated = t(tkey);

	return <Fragment>{translated !== tkey ? translated : children}</Fragment>;
};

export { T };
