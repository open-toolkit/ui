export class Content {
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

		s.gridColumn = "2";
		s.gridRow = "2";

		s.overflowY = "scroll"
	}

	protected render() : void {
		this.element.innerText = "Content"
	}

	public get(): HTMLElement {
		return this.element
	}
}
