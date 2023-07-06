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
