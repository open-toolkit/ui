export class SideBar {
	protected element: HTMLElement;

	public constructor() {
		this.element = document.createElement("div");

		this.style();
		this.render();
	}

	protected style(): void {
		const s = this.element.style;

		s.padding = "0";
		s.margin = "0";

		s.gridColumn = "1";
		s.gridRow = "2";
	}

	protected render(): void {
		this.element.innerText = "Side Bar";
	}

	public get(): HTMLElement {
		return this.element;
	}
}
