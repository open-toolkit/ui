import html from "@rollup/plugin-html";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import esbuild from "rollup-plugin-esbuild";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
	input: "./src/index.ts",
	output: {
		file: `public/index.js`,
		format: "es",
		sourcemap: true,
		strict: true,
	},
	plugins: [
		nodeResolve(),
		esbuild({ minify: true, sourceMap: true, tsconfig: "./tsconfig.json" }),
		postcss({ plugins: [autoprefixer()], modules: true, extract: true, minimize: true }),
		html({ title: "ui" }),
	],
};
