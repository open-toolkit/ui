export class App {
	protected element: HTMLElement;
	protected children: HTMLElement[];

	public constructor(topBar: HTMLElement, sideBar: HTMLElement, content: HTMLElement) {
		this.element = document.createElement("div")
		this.children = [sideBar, topBar, content];

		this.style();
		this.render();
	}

	protected render(): void {
		for (const child of this.children) {
			this.element.appendChild(child);
		}
	}

	protected style(): void {
		const s = this.element.style;

		s.padding = "0";
		s.margin = "0";

		s.display = "grid";

		s.gridTemplateColumns = "10vw 90vw";
		s.gridTemplateRows = "7vh 93vh";
	}

	public get(): HTMLElement {
		return this.element;
	}
}
