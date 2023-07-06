import { createElement as ce } from "@lib/createElement";
import style from "./style.module.scss";
import { Card } from "../../models/card";

export class CardView {
	protected element: HTMLElement;

	protected card: Card;
	protected children: Map<string, HTMLElement>;

	constructor(card: Card) {
		this.card = card;
		this.children = new Map();

		const observables = this.card.get();

		const title = ce({
			tagName: "h2",
		});
		this.children.set("title", title);
		observables.title.on("changed", this.onTitleChange, this);
		this.onTitleChange(observables.title.get());

		const id = ce({
			tagName: "h4",
		});
		this.children.set("id", id);
		observables.id.on("changed", this.onIdChange, this);
		this.onIdChange(observables.id.get());

		const description = ce({
			tagName: "p",
		});
		this.children.set("description", description);
		observables.title.on("changed", this.onDescriptionChange, this);
		this.onDescriptionChange(observables.description.get());

		this.element = ce({
			tagName: "div",
			children: [title, id, description],
		});
		this.element.className = style.card;
	}

	public get(): HTMLElement {
		return this.element;
	}

	protected onIdChange(id: number): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const child = this.children.get("id")!;

		child.innerText = id.toString();
	}

	protected onTitleChange(title: string): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const child = this.children.get("title")!;

		child.innerText = title;
	}

	protected onDescriptionChange(description: string): void {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const child = this.children.get("description")!;

		child.innerText = description;
	}

	public dispose(): void {
		const observables = this.card.get();

		observables.id.off("changed", this.onIdChange);
		observables.title.off("changed", this.onTitleChange);
		observables.description.off("changed", this.onDescriptionChange);

		this.card = undefined as any;

		this.children.clear();
		this.children = undefined as any;

		this.element.remove();
		this.element = undefined as any;
	}
}
