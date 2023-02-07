const esbuild = require("esbuild");

const config = {
	entryPoints: ["src/index.ts"],
	bundle: true,
	minify: true,
	outfile: "public/js/index.js",
	platform: "neutral",
	format: "esm",
	sourcemap: true,
};

const build = async () => {
	try {
		const start = Date.now();
		await esbuild.build(config);
		const end = Date.now();

		console.log(`Build in ${end - start}ms`);
	} catch (error) {
		console.log(`ERROR: ${error}`);
	}
};

module.exports = {
	build,
};
