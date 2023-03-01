import { createElement as ce } from "@lib/createElement";
import { PublicBroker } from "@lib/brokers/public";
import { Module } from "../models/module";
import { ModuleStore, InEvents as ModuleStoreInEvents } from "../stores/module";

interface Events extends ModuleStoreInEvents {}

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
		this.element = ce({
			tagName: "div",
			style: {
				padding: "0",
				paddingRight: "1vw",
				paddingLeft: "1vw",
				paddingTop: "1vh",
				margin: "0",
				backgroundColor: "var(--dark)",
			},
		});

		this.children = new Map();

		this.publicBroker = publicBroker;
		this.moduleStore = moduleStore;

		this.changes = [];

		for (const model of this.moduleStore.get()) {
			this.change("added", model);
		}

		this.subscribe();
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

	protected render(): void {
		for (const change of this.changes) {
			const model = change.model;
			let child: HTMLElement;

			switch (change.type) {
				case "added":
					child = ce({ tagName: "div", innerText: model.get().name });
					this.children.set(model.get().name, child);
					this.element.appendChild(child);
					break;
				case "deleted":
					child = this.children.get(model.get().name)!;
					this.children.delete(model.get().name);
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
