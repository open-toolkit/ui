import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "@rollup/plugin-html";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import pkg from "./package.json" assert { type: "json" };
import { createHash } from "crypto";

const hash = createHash("md5").update(Date.now().toString()).digest("hex").substr(0, 8);

export default {
	input: "src/index.ts",
	output: [
		{
			file: `public/index.${hash}.js`,
			format: "es",
			sourcemap: true,
		},
	],
	external: [...Object.keys(pkg.dependencies || {})],
	plugins: [
		typescript(),
		postcss({ plugins: [autoprefixer()], modules: true, extract: true, minimize: true, sourceMap: true }),
		html({ title: "ui" }),
		terser(),
	],
	watch: {
		include: ["src/**", "lib/**"],
	},
};
