import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser';

export default {
	input: "src/index.ts",
	output: [
		{
			file: "public/js/index.js",
			format: "es",
			sourcemap: true
		},
	],
	plugins: [terser(), typescript()],
};
