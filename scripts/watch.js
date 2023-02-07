const chokidar = require("chokidar");
const { build } = require("./utils.js");

const watcher = chokidar.watch(["src/**/*"]);

build();

watcher.on("change", () => {
	build();
})
