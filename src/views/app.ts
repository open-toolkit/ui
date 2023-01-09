import { SideBar } from "./sideBar.js";
import { TopBar } from "./topBar.js";
import { Content } from "./content.js";

export class App {
	protected element: HTMLElement;
	protected children: {
		sideBar: SideBar;
		topBar: TopBar;
		content: Content;
	};

	public constructor(dom: HTMLElement) {
		this.element = dom;

		this.children = {
			sideBar: new SideBar(),
			topBar: new TopBar(),
			content: new Content(),
		};

		this.style();
		this.render();
	}

	protected render(): void {
		this.element.appendChild(this.children.topBar.get());
		this.element.appendChild(this.children.sideBar.get());
		this.element.appendChild(this.children.content.get());
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