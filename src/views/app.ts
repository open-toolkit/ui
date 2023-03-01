import { createElement as ce } from "@lib/createElement";

export class App {
	protected element: HTMLElement;

	public constructor(sideBar: HTMLElement, content: HTMLElement) {
		this.element = ce({
			tagName: "div",
			style: {
				padding: "0",
				margin: "0",
				display: "grid",
				gridTemplateRows: "100vh",
				gridTemplateColumns: "12vw 88vw",
			},
			children: [sideBar, content],
		});
	}

	public get(): HTMLElement {
		return this.element;
	}
}
