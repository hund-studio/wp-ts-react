import { FC } from "react";
import modeFlag from "./modeFlag.module.scss";

/**
 * This is a TypeScript React functional component that conditionally renders a development mode flag.
 * @returns If the `TARGET` environment variable is set to "production", the component returns `null`.
 * Otherwise, it returns a `div` element with a `className` of `modeFlag.container` and an inner `div`
 * element with a `className` of `modeFlag.inner` and a `code` element displaying the value of the
 * `TARGET` variable.
 */
const ModeFlag: FC = () => {
	if (TARGET === "production") {
		return null;
	}

	return (
		<div className={modeFlag.container}>
			<div className={modeFlag.inner}>
				<code>{TARGET} mode</code>
			</div>
		</div>
	);
};

export { ModeFlag };
