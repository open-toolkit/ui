import { createElement as ce } from "../../libs/createElement";
import { SidebarView } from "../sidebar/index";
import { ModuleStore } from "../../stores/module";
import { ContentView } from "../content/index";
import { Observable } from "../../libs/observable";
import { Module } from "../../models/module";

export class AppView {
	protected element: HTMLElement;
	protected sidebar: SidebarView;
	protected content: ContentView;

	public constructor(moduleStore: ModuleStore, currentModule: Observable<Module>) {
		this.sidebar = new SidebarView(moduleStore);
		this.content = new ContentView(currentModule);

		this.element = ce({
			tagName: "div",
			style: {
				padding: "0",
				margin: "0",
				display: "grid",
				gridTemplateRows: "100vh",
				gridTemplateColumns: "12vw 88vw",
			},
			children: [this.sidebar.get(), this.content.get()],
		});
	}

	public get(): HTMLElement {
		return this.element;
	}
}
