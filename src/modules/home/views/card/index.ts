import { createElement as ce } from "../../../../libs/createElement";
import style from "./style.module.scss";
import { Card } from "../../models/card";

interface CardViewChildren {
	id: HTMLElement;
	title: HTMLElement;
	description: HTMLElement;
}

export class CardView {
	private element: HTMLElement;
	private children: CardViewChildren;
	private card: Card;

	constructor(card: Card) {
		this.card = card;

		const observables = card.get();

		const id = ce({
			tagName: "h4",
		});

		const title = ce({
			tagName: "h2",
		});

		const description = ce({
			tagName: "p",
		});

		this.children = { id, title, description };

		this.element = ce({
			tagName: "div",
			children: [title, id, description],
		});
		this.element.className = style.card;

		observables.id.on("changed", this.onIdChange, this);
		observables.title.on("changed", this.onTitleChange, this);
		observables.description.on("changed", this.onDescriptionChange, this);

		this.onIdChange(observables.id.get());
		this.onTitleChange(observables.title.get());
		this.onDescriptionChange(observables.description.get());
	}

	public get(): HTMLElement {
		return this.element;
	}

	public remove(): void {
		const observables = this.card.get();

		observables.id.off("changed", this.onIdChange);
		observables.title.off("changed", this.onTitleChange);
		observables.description.off("changed", this.onDescriptionChange);

		this.element.remove();
	}

	private onIdChange(id: number): void {
		this.children.id.innerText = id.toString();
	}

	private onTitleChange(title: string): void {
		this.children.title.innerText = title;
	}

	private onDescriptionChange(description: string): void {
		this.children.description.innerText = description;
	}
}
