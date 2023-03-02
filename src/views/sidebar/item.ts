import { createElement } from "@lib/createElement";
import { Module } from "@src/models/module";

export class Item {
	protected element: HTMLElement;

	public constructor(model: Module) {
		this.element = createElement({ tagName: "div", innerText: model.get().name });
	}

	public get(): HTMLElement {
		return this.element;
	}
}
