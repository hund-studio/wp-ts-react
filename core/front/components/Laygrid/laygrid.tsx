import { useData } from "@core/hooks";
import { FC } from "react";

interface LaygridProps {
	data?: string;
}

const Laygrid: FC<LaygridProps> = ({ data }) => {
	const { data: currentData } = useData();

	if (!data && !currentData?.laygrid) return null;

	return (
		<div
			dangerouslySetInnerHTML={{ __html: data || currentData.laygrid }}></div>
	);
};

export { Laygrid };
