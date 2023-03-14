import { createElement } from "@lib/createElement";
import { Module } from "@src/models/module";
import style from "./item.module.scss";

export class Item {
	protected element: HTMLElement;

	public constructor(model: Module) {
		this.element = createElement({ tagName: "div", innerText: model.get().name });
		this.element.className = style.item;
	}

	public get(): HTMLElement {
		return this.element;
	}
}
