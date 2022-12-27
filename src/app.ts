export class App {
	public readonly element: HTMLElement

	public constructor() {
		this.element = document.createElement("div")

		this.element.innerHTML = "App";
	}
}
