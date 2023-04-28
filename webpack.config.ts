import api from "./config/api.json";
import FileManagerPlugin from "filemanager-webpack-plugin";
import hosts from "./config/hosts.json";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import packageJSON from "./package.json";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import WatchExternalFilesPlugin from "webpack-watch-files-plugin";
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
import { removeMultipleSlashes } from "./core/front/utils/removeMultipleSlashes";
import { removeTrailingSlashes } from "./core/front/utils/string/removeTrailingSlashes";

/**
 * Define useful interfaces
 */

interface WebpackEnv {
	WEBPACK_BUNDLE: boolean;
	WEBPACK_BUILD: boolean;
}

interface WebpackArgv {
	[key: string]: string | undefined;
	mode: Configuration["mode"];
}

enum WPTargets {
	local = "local",
	staging = "staging",
	production = "production",
}

enum WebpackAction {
	watch = "watch",
	serve = "serve",
	build = "build",
}

/**
 * Fetch config
 */

const { target, action } = process.env as {
	target: WPTargets;
	action: WebpackAction;
};

const wpNamespace = removeMultipleSlashes(api.base);
const wpReactNamespace = removeMultipleSlashes(
	path.join(api.wpreact.namespace, api.wpreact.version)
);

const targetHost = removeTrailingSlashes(hosts[target]);
const apiNamespace = path.join(wpNamespace, wpReactNamespace);

/**
 * Crete const values
 */

const dir = {
	tsconfig: path.join(__dirname, "tsconfig.json"),
	entry: path.join(__dirname, "core/front", "index.tsx"),
	output: path.join(__dirname, "bundle"),
	dist: path.join(__dirname, "bundle", packageJSON.name, "dist"),
	devIndex: path.join(
		__dirname,
		"bundle",
		packageJSON.name,
		"dist",
		"index.html"
	),
	theme: path.join(__dirname, "bundle", packageJSON.name),
	public: path.join(__dirname, "public"),
	template: path.join(__dirname, "public", "index.html"),
};

/**
 * Webpack config
 */

const config = async (
	env: WebpackEnv,
	argv: WebpackArgv
): Promise<Configuration> => {
	return {
		mode: argv.mode,
		devtool: "source-map",
		devServer: {
			port: 3000,
			historyApiFallback: {
				index: "index.html",
			},
			static: dir.dist,
		},
		experiments: {
			topLevelAwait: true,
		},
		entry: dir.entry,
		output: {
			path: dir.dist,
			filename: "client.js",
			publicPath:
				action === "serve"
					? "/"
					: `/wp-content/themes/${packageJSON.name}/dist/`,
		},
		resolve: {
			modules: ["node_modules"],
			extensions: [".js", ".tsx", ".ts", ".scss"],
			plugins: [
				new TsconfigPathsPlugin({
					configFile: dir.tsconfig,
				}),
			],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					styles: {
						name: "styles",
						type: "css/mini-extract",
						chunks: "all",
						enforce: true,
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/i,
					use: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.svg$/i,
					type: "asset",
					resourceQuery: /url/,
				},
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					resourceQuery: { not: [/url/] },
					use: ["@svgr/webpack"],
				},
				{
					test: /\.(png|jpe?g|gif|jp2|webp|mp4)$/i,
					loader: "file-loader",
					options: {
						name: "[name].[ext]",
					},
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								emit: true,
							},
						},
						{
							loader: "css-loader",
							options: {
								modules: {
									auto: true,
									localIdentName: "[name]__[local]___[hash:base64:5]",
								},
							},
						},
						"sass-loader",
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: dir.devIndex,
				template: dir.template,
			}),
			new MiniCssExtractPlugin({
				filename: "main.css",
			}),
			new DefinePlugin({
				TARGET: JSON.stringify(target),
				TARGET_HOST: JSON.stringify(targetHost),
				API_NAMESPACE: JSON.stringify(apiNamespace),
			}),
			new WatchExternalFilesPlugin({
				files: [
					path.join(__dirname, `public/**/*`),
					path.join(__dirname, `theme/**/*`),
					path.join(__dirname, `core/admin/**/*`),
				],
			}),
			action !== "serve" &&
				new FileManagerPlugin({
					runOnceInWatchMode: false,
					runTasksInSeries: true,
					events: {
						onStart: [
							{
								delete: [
									path.resolve(dir.theme, "core"),
									path.resolve(dir.theme, "config"),
								],
							},
						],
						onEnd: [
							{
								copy: [
									{
										source: path.resolve(__dirname, "theme"),
										destination: dir.theme,
									},
									{
										source: path.resolve(__dirname, "public"),
										destination: path.resolve(dir.theme, "public"),
									},
									{
										source: path.resolve(__dirname, "config"),
										destination: path.resolve(dir.theme, "config"),
									},
									{
										source: path.resolve(__dirname, "core/admin"),
										destination: path.resolve(dir.theme, "core"),
									},
								],
							},
							{
								archive: [
									{
										source: dir.theme,
										destination: path.join(
											dir.output,
											`${packageJSON.name}.zip`
										),
									},
								],
							},
						],
					},
				}),
		].flatMap((i) => (!!i ? [i] : [])),
	};
};

export default config;
