import { createElement as ce } from "@lib/createElement";
import { Module } from "@src/models/module";
import { ModuleStore } from "@src/stores/module";
import { Item } from "./sidebar/item";

export class SideBar {
	protected element: HTMLElement;
	protected indexing: Map<string, Item>;

	protected moduleStore: ModuleStore;
	public constructor(moduleStore: ModuleStore) {
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

		this.indexing = new Map();

		this.moduleStore = moduleStore;

		for (const model of this.moduleStore.iter()) {
			this.added(model);
		}

		this.subscribe();
	}

	protected subscribe(): void {
		this.moduleStore.subscribe("added", this.added, this);
		this.moduleStore.subscribe("removed", this.removed, this);
	}

	protected added(model: Module): void {
		const child = new Item(model);

		this.indexing.set(model.get().name, child);

		this.element.appendChild(child.get());
	}

	protected removed(model: Module): void {
		const child = this.indexing.get(model.get().name);

		if (child === undefined) return;

		this.indexing.delete(model.get().name);

		this.element.removeChild(child.get());
	}

	public get(): HTMLElement {
		return this.element;
	}
}
