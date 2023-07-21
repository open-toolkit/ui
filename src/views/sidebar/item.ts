import { createElement } from "../../libs/createElement";
import { Module } from "../../models/module";
import style from "./item.module.scss";

export class SidebarItemView {
	protected element: HTMLElement;

	public constructor(model: Module) {
		this.element = createElement({ tagName: "div", innerText: model.get().name });
		this.element.className = style.item;
	}

	public get(): HTMLElement {
		return this.element;
	}
}
