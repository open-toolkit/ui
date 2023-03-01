import { PrivateBroker } from "@lib/brokers/private";
import { PublicBroker } from "@lib/brokers/public";
import { Module, ModuleDTO } from "../models/module";

export interface InEvents {
	add: ModuleDTO;
	delete: ModuleDTO;
}

export interface OutEvents {
	added: Module;
	deleted: Module;
}

export class ModuleStore extends PrivateBroker<OutEvents> {
	protected modules: Map<string, Module>;

	public constructor(publicBroker: PublicBroker<InEvents>) {
		super();

		this.modules = new Map();

		publicBroker.subscribe("add", this.add, this);
		publicBroker.subscribe("delete", this.delete, this);
	}

	public get(): IterableIterator<Module> {
		return this.modules.values();
	}

	protected add(raw: ModuleDTO): void {
		const newModule = new Module(raw);

		this.modules.set(raw.name, newModule);
		this.publish("added", newModule);
	}

	protected delete(raw: ModuleDTO): void {
		const existingModule = this.modules.get(raw.name);

		if (typeof existingModule === "undefined") return;

		this.modules.delete(raw.name);
		this.publish("deleted", existingModule);
	}
}
