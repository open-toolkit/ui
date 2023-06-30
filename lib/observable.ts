import { EventEmiter } from "./eventEmiter";

class DisposedError extends Error {
	constructor(where: "get" | "set") {
		super(`Can't ${where} value cause observable has been disposed`);
	}
}

interface Events<T> {
	changed: [T];
	disposed: [];
}

export class Observable<T> extends EventEmiter<Events<T>> {
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
