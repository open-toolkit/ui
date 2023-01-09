import { TopBar } from "./views/topBar.js";
import { SideBar } from "./views/sideBar.js";
import { Content } from "./views/content.js";

import { App } from "./views/app.js";
import { PublicBroker } from "./lib/brokers/public.js";
import { InEvents as ModuleStoreInEvents, ModuleStore } from "./stores/module.js";

interface PublicEvents extends ModuleStoreInEvents { }

const publicBroker = new PublicBroker<PublicEvents>();
const moduleStore = new ModuleStore(publicBroker);

publicBroker.publish("add", { name: "lol0" });

setTimeout(() => {
	publicBroker.publish("add", { name: "lol1" });
}, 2000);

setTimeout(() => {
	publicBroker.publish("delete", { name: "lol0" });
}, 4000);

const topBar = new TopBar();
const sideBar = new SideBar(publicBroker, moduleStore);
const content = new Content();

const app = new App(topBar.get(), sideBar.get(), content.get());

document.body.appendChild(app.get());
