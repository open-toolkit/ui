import "./index.css";

import { SideBar } from "./views/sidebar";
import { Content } from "./views/content";

import { App } from "./views/app";
import { ModuleStore } from "./stores/module";
import { Module } from "./models/module";

const moduleStore = new ModuleStore();

moduleStore.add("lol0", new Module({ name: "lol0" }));
moduleStore.add("lol1", new Module({ name: "lol1" }));
moduleStore.add("lol2", new Module({ name: "lol2" }));

setTimeout(() => {
	moduleStore.add("lol3", new Module({ name: "lol3" }));
}, 2000);

setTimeout(() => {
	moduleStore.remove("lol1");
}, 4000);

const sidebar = new SideBar(moduleStore);
const content = new Content();

const app = new App(sidebar.get(), content.get());

document.body.appendChild(app.get());
