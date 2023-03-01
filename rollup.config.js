import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "@rollup/plugin-html";
import postcss from "rollup-plugin-postcss";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "public/index.js",
			format: "es",
			sourcemap: true,
		},
	],
	plugins: [
		typescript(),
		postcss({ modules: true, extract: true, minimize: true, sourceMap: true }),
		html({ title: "ui" }),
		terser(),
	],
};
