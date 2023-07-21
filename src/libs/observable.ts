import { EventEmitter } from "./eventEmiter";

class DisposedError extends Error {
	constructor(action: string) {
		super(`Can't ${action} value cause observable has been disposed`);
	}
}

interface ObservableEvents<T> {
	changed: [T];
	disposed: [];
}

export class Observable<T> extends EventEmitter<ObservableEvents<T>> {
	protected value: T;
	private disposed: boolean;

	constructor(initialValue: T) {
		super(["changed", "disposed"]);

		this.value = initialValue;
		this.disposed = false;
	}

	public get(): T {
		if (this.disposed) throw new DisposedError("get");

		return this.value;
	}

	public set(value: T): void {
		if (this.disposed) throw new DisposedError("set");

		this.value = value;

		this.emit("changed", value);
	}

	public dispose() {
		this.disposed = true;
		this.value = undefined as any;
		this.emit("disposed");
	}
}

interface ObservableArrayEvents<T> {
	added: [T];
	removed: [T];
	disposed: [];
}

export class ObservableArray<T> extends EventEmitter<ObservableArrayEvents<T>> {
	protected values: T[];
	private disposed: boolean;

	constructor(initialValues: T[] = []) {
		super(["added", "removed", "disposed"]);

		this.values = initialValues;
		this.disposed = false;
	}

	public get(): T[] {
		if (this.disposed) throw new DisposedError("get");

		return this.values;
	}

	public add(value: T): void {
		if (this.disposed) throw new DisposedError("add");

		this.values.push(value);

		this.emit("added", value);
	}

	public remove(value: T, count = 1): void {
		if (this.disposed) throw new DisposedError("remove");

		for (let i = 0; i < this.values.length; i++) {
			const currentValue = this.values[i];

			if (currentValue !== value) continue;

			this.values.splice(i, 1);
			this.emit("removed", currentValue);

			count--;
			if (count === 0) break;

			i = i - 1;
		}
	}

	public dispose() {
		this.disposed = true;

		this.values = undefined as any;

		this.emit("disposed");
	}
}

type CallbackFn<Args extends readonly unknown[], T> = (...args: Args) => T;

type ObservableCallback = CallbackFn<readonly unknown[], void | Promise<void>>;

export default new (class {
	private readonly _observables: WeakMap<object, Map<string, ObservableCallback[]>>;

	constructor() {
		this._observables = new WeakMap();
	}

	public on(obj: object, topic: string, callback: ObservableCallback): void {
		const topics = this._observables.get(obj);

		if (!topics) {
			const newTopics = new Map();

			newTopics.set(topic, [callback]);

			this._observables.set(obj, newTopics);
			return;
		}

		const observers = topics.get(topic)!;

		observers.push(callback);
	}

	public off(obj: object, topic: string, callback: ObservableCallback): void {
		const topics = this._observables.get(obj);

		if (!topics) return;

		const observers = topics.get(topic);

		if (!observers) return;

		const idx = observers.findIndex(v => v === callback);

		if (idx === -1) return;

		const lastIdx = observers.length - 1;

		if (idx !== lastIdx) {
			observers[idx] = observers[lastIdx];
		}

		observers.pop();
	}

	public emit(obj: object, topic: string, ...args: unknown[]): void {
		const topics = this._observables.get(obj);

		if (!topics) return;

		const observers = topics.get(topic);

		if (!observers) return;

		for (const observer of observers) {
			observer(...args);
		}
	}
})();
