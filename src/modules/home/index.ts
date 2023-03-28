import { createElement as ce } from "@lib/createElement";
import { Module } from "@src/models/module";

export class Home {
	protected element: HTMLElement;

	public constructor() {
		this.element = ce({
			tagName: "div",
		});
	}

	public get(): HTMLElement {
		return this.element;
	}
}

const content = new Home();

export default new Module({
	name: "Home",
	content: content.get(),
});
