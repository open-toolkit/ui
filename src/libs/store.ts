import { PrivateBroker } from "./brokers/private";

interface Change<T> {
	type: "added" | "removed";
	model: T;
}

export interface Topics<T> {
	added: T;
	removed: T;
}

export class Store<T, K> extends PrivateBroker<Topics<T>> {
	protected items: Map<K, T>;

	public constructor() {
		super(["added", "removed"]);

		this.items = new Map();
	}

	public iter(): IterableIterator<T> {
		return this.items.values();
	}

	public get(key: K): T | undefined {
		return this.items.get(key);
	}

	public add(key: K, item: T): void {
		if (this.items.has(key)) return;

		this.items.set(key, item);

		this.publish("added", item);
	}

	public remove(key: K): void {
		const item = this.items.get(key);
		const emit = this.items.delete(key);

		if (!emit || item === undefined) return;

		this.publish("removed", item);
	}
}
