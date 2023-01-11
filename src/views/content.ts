import { createElement as ce } from "../lib/createElement.js";

export class Content {
	protected element: HTMLElement;

	public constructor() {
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
	}

	public get(): HTMLElement {
		return this.element;
	}
}
