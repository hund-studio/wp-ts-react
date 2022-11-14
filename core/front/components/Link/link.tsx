import { trimSlashes } from "core/front/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, LinkProps, useLocation } from "react-router-dom";

const Link: FC<Omit<LinkProps, "to"> & { to?: string; lang?: string }> = ({
	to: _to,
	lang: _lang,
	...props
}) => {
	const isToExternal =
		typeof _to === "string" &&
		["http://", "https://"].some((prefix) => _to.startsWith(prefix));

	if (isToExternal) return <a href={_to} {...props} />;

	const location = useLocation();
	const { i18n } = useTranslation();

	const to = _to || location.pathname;
	const lang = _lang || i18n.language || null;

	if (!lang) return <RouterLink to={to} {...props} />;

	const languagePathBit = trimSlashes(to).split("/")[0];
	const isTranslatedTo = i18n.languages?.includes(languagePathBit);

	return (
		<RouterLink
			onClick={() => {
				i18n.changeLanguage(lang);
			}}
			to={
				!isTranslatedTo
					? `/${trimSlashes(lang)}/${trimSlashes(to)}`
					: `/${trimSlashes(to)}/`.replace(`/${languagePathBit}/`, `/${lang}/`)
			}
			{...props}
		/>
	);
};

export { Link };
