import html from "@rollup/plugin-html";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import typescript from "@rollup/plugin-typescript";
import esbuild from "rollup-plugin-esbuild";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { createHash } from "crypto";

const hash = createHash("md5").update(Date.now().toString()).digest("hex").substr(0, 8);

export default {
	input: "./src/index.ts",
	output: {
		file: `public/index.${hash}.js`,
		format: "es",
	},
	plugins: [
		typescript(),
		nodeResolve(),
		//esbuild({ target: "esnext", minify: true, tsconfig: "tsconfig.json" }),
		postcss({ plugins: [autoprefixer()], modules: true, extract: true, minimize: true }),
		html({ title: "ui" }),
	],
};
