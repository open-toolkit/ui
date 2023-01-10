import { createElement as ce } from "../lib/createElement.js";

export class TopBar {
	protected element: HTMLElement;

	public constructor() {
		this.element = ce({
			tagName: "div",
			style: {
				padding: "0",
				margin: "0",
				gridColumnStart: "1",
				gridColumnEnd: "3",
				gridRow: "1",
			},
			innerText: "Top bar",
		});
	}

	public get(): HTMLElement {
		return this.element;
	}
}
