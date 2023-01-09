import { PublicBroker } from "../lib/brokers/public.js";
import { Module } from "../models/module.js";
import { ModuleStore, InEvents as ModuleStoreInEvents } from "../stores/module.js";

interface Events extends ModuleStoreInEvents { }

interface Change {
	type: "deleted" | "added";
	model: Module;
}

export class SideBar {
	protected element: HTMLElement;
	protected children: Map<string, HTMLElement>;

	protected publicBroker: PublicBroker<Events>;
	protected moduleStore: ModuleStore;

	protected changes: Change[];
	public constructor(publicBroker: PublicBroker<Events>, moduleStore: ModuleStore) {
		this.element = document.createElement("div");
		this.children = new Map();

		this.publicBroker = publicBroker;
		this.moduleStore = moduleStore;

		this.changes = [];

		for (const model of this.moduleStore.get()) {
			this.change("added", model);
		}

		this.subscribe();
		this.style();
		this.render();
	}

	protected subscribe(): void {
		this.moduleStore.subscribe("added", this.added, this);
		this.moduleStore.subscribe("deleted", this.deleted, this);
	}

	protected change(type: "deleted" | "added", model: Module): void {
		this.changes.push({ type, model });
	}

	protected added(model: Module): void {
		this.change("added", model);
		this.render();
	}

	protected deleted(model: Module): void {
		this.change("deleted", model);
		this.render();
	}

	protected style(): void {
		const s = this.element.style;

		s.padding = "0";
		s.margin = "0";

		s.gridColumn = "1";
		s.gridRow = "2";
	}

	protected render(): void {
		for (const change of this.changes) {
			const model = change.model;
			let child: HTMLElement;

			switch (change.type) {
				case "added":
					child = document.createElement("div");
					child.innerText = model.name
					this.children.set(model.name, child);
					this.element.appendChild(child);
					break;
				case "deleted":
					child = this.children.get(model.name)!;
					this.children.delete(model.name);
					this.element.removeChild(child);
					break;
			}
		}

		this.changes = [];
	}

	public get(): HTMLElement {
		return this.element;
	}
}
