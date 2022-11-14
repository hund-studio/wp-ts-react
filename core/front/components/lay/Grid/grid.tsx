import { useData } from "@core/hooks";
import { FC } from "react";

interface GridProps {
	data?: string;
}

const Grid: FC<GridProps> = ({ data: laygrid }) => {
	const { data: _data } = useData();
	const html = laygrid || _data.laygrid;

	if (!html) return null;

	return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export { Grid };
