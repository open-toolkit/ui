import { createElement as ce } from "@lib/createElement";
import { ObservableArray } from "@lib/observable";
import { Card } from "../../models/card";
import { CardView } from "../card";

export class AppView {
	protected element: HTMLElement;
	protected cards: ObservableArray<Card>;
	protected indexing: Map<number, CardView>;

	public constructor(cards: ObservableArray<Card>) {
		this.cards = cards;
		this.indexing = new Map();

		this.element = ce({
			tagName: "div",
		});

		this.cards.on("added", this.onCardAdded, this);
		this.cards.on("removed", this.onCardRemoved, this);

		for (const card of this.cards.get()) {
			this.onCardAdded(card);
		}
	}

	protected onCardAdded(card: Card): void {
		const idx = card.get().id.get();
		const cardView = new CardView(card);

		this.indexing.set(idx, cardView);

		this.element.appendChild(cardView.get());
	}

	protected onCardRemoved(card: Card): void {
		const idx = card.get().id.get();

		const cardView = this.indexing.get(idx)!;

		cardView.remove();

		this.indexing.delete(idx);
	}

	public get(): HTMLElement {
		return this.element;
	}

	public dispose() {
		for (const child of this.indexing.values()) {
			child.remove();
		}

		this.indexing.clear();

		this.element.remove();
		this.element = undefined as any;

		this.cards.off("added", this.onCardAdded);
		this.cards.off("removed", this.onCardRemoved);

		this.cards = undefined as any;
	}
}
