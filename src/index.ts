import "./index.css";

import { AppView } from "./views/app/index";
import { ModuleStore } from "./stores/module";

import HomeModule from "./modules/home/index";
import obs, { Observable } from "./libs/observable";

const moduleStore = new ModuleStore();
const currentModule = new Observable(HomeModule);

moduleStore.add(HomeModule.get().name, HomeModule);

const app = new AppView(moduleStore, currentModule);

document.body.appendChild(app.get());
