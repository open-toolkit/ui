export class TopBar {
	protected element: HTMLElement;

	public constructor() {
		this.element = document.createElement("div");

		this.style()
		this.render()
	}

	protected style(): void {
		const s = this.element.style;

		s.padding = "0";
		s.margin = "0";

		s.gridColumnStart = "1";
		s.gridColumnEnd = "3";

		s.gridRow = "1";
	}

	protected render() : void {
		this.element.innerText = "Top Bar"
	}

	public get(): HTMLElement {
		return this.element
	}
}
