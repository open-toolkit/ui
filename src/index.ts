import { SideBar } from "./views/sideBar";
import { Content } from "./views/content";

import { App } from "./views/app";
import { PublicBroker } from "@lib/brokers/public";
import { InEvents as ModuleStoreInEvents, ModuleStore } from "./stores/module";

interface PublicEvents extends ModuleStoreInEvents {}

const publicBroker = new PublicBroker<PublicEvents>();
const moduleStore = new ModuleStore(publicBroker);

publicBroker.publish("add", { name: "lol0" });

setTimeout(() => {
	publicBroker.publish("add", { name: "lol1" });
}, 2000);

setTimeout(() => {
	publicBroker.publish("delete", { name: "lol0" });
}, 4000);

const sideBar = new SideBar(publicBroker, moduleStore);
const content = new Content();

const app = new App(sideBar.get(), content.get());

document.body.appendChild(app.get());
