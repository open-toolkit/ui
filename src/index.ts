import "./index.css";

import { SideBar } from "./views/sidebar";
import { Content } from "./views/content";

import { App } from "./views/app";
import { ModuleStore } from "./stores/module";

import HomeModule from "./modules/home/index"

const moduleStore = new ModuleStore();

moduleStore.add(HomeModule.get().name, HomeModule)

const sidebar = new SideBar(moduleStore);
const content = new Content();

const app = new App(sidebar.get(), content.get());

document.body.appendChild(app.get());
