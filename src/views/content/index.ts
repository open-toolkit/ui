import { createElement as ce } from "../../libs/createElement";
import { Observable } from "../../libs/observable";
import { Module } from "../../models/module";

export class ContentView {
	protected element: HTMLElement;

	public constructor(currentModule: Observable<Module>) {
		this.element = ce({
			tagName: "div",
			style: {
				padding: "0",
				margin: "0",
				gridColumn: "2",
				overflowY: "scroll",
			},
			innerText: "Content",
		});

		currentModule.on("changed", this.onCurrentChanged, this);

		this.onCurrentChanged(currentModule.get());
	}

	protected onCurrentChanged(mod: Module): void {
		this.element.replaceChildren(mod.get().content);
	}

	public get(): HTMLElement {
		return this.element;
	}
}
