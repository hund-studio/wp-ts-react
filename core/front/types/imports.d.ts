declare module "*.svg?url";

declare module "*.svg" {
	import React = require("react");
	const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}

declare module "*.png";

declare module "*.jpg";

declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}

declare module "*.mp4" {
	const src: string;
	export default src;
}
