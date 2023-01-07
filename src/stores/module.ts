import { Broker } from "../lib/broker.js";
import { Module } from "../models/module.js";

interface Events {
	create: Module;
}

export class ModuleStore extends Broker<Events> {
	protected modules: Map<string, Module>;

	public constructor() {
		super();
	}

	public create(raw: { name: string }) {
		this.modules.set(raw.name, new Module(raw.name));
	}
}
