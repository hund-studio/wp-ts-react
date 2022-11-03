import { createErrorString } from "./../../utils/createErrorString";
import { FC } from "react";
import modeFlag from "./modeFlag.module.scss";

const ModeFlag: FC = () => {
	if (!TARGET) {
		console.log(
			createErrorString({
				path: "💢: something went wrong in 'core > front > components > ... > modeFlag.tsx'",
				message: "😢: WP target const is not defined",
			})
		);
		return null;
	}

	return TARGET !== "production" ? (
		<div className={modeFlag.container}>
			<div className={modeFlag.inner}>
				<code>{TARGET} mode</code>
			</div>
		</div>
	) : null;
};

export { ModeFlag };
