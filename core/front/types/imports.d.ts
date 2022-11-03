declare module "*.svg" {
	const content: any;
	export default content;
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
