type Callback<T extends any[], V> = (...args: T) => V;

type EventEmiterCallback<T extends any[]> = Callback<T, void>;

type Listener<T extends any[]> = [EventEmiterCallback<T>, any];

class UnknownEvent extends Error {
	constructor(event: string) {
		super(`Unknown event: ${event}`);

		this.name = "UnknownEvent";
	}
}

class CallbackError extends Error {
	constructor(event: string, cause: any = undefined) {
		super(`Error while calling callback in event: ${event}`, { cause });

		this.name = "CallbackError";
	}
}

class EmitingErrors extends Error {
	protected errors: CallbackError[];

	constructor(event: string, errors: CallbackError[]) {
		super(`Couldn't fully emit in event: ${event}`);

		this.name = "EmitingErrors";
		this.errors = errors;
	}

	public getErrors(): CallbackError[] {
		return this.errors;
	}
}

export class EventEmitter<T extends { [K in keyof T]: any[] }> {
	protected listeners: Map<string, Listener<any>[]>;

	constructor(events: Extract<keyof T, string>[]) {
		this.listeners = new Map();

		for (const event of events) {
			this.listeners.set(event, []);
		}
	}

	public on<K extends Extract<keyof T, string>>(
		event: K,
		callback: EventEmiterCallback<T[K]>,
		thisValue: any = undefined
	): void {
		const listeners = this.listeners.get(event);

		if (!listeners) throw new UnknownEvent(event);

		for (let i = 0; i < listeners.length; i++) {
			if (listeners[i][0] === callback) return;
		}

		listeners.push([callback, thisValue]);
	}

	public off<K extends Extract<keyof T, string>>(event: K, callback: EventEmiterCallback<T[K]>): void {
		const listeners = this.listeners.get(event);

		if (!listeners) throw new UnknownEvent(event);

		let idx = -1;

		for (let i = 0; i < listeners.length; i++) {
			if (listeners[i][0] !== callback) continue;

			idx = i;
			break;
		}

		if (idx === -1) return;

		listeners.splice(idx, 1);
	}

	public emit<K extends Extract<keyof T, string>>(event: K, ...value: T[K]): void {
		const listeners = this.listeners.get(event);

		if (!listeners) throw new UnknownEvent(event);

		const errors = [];

		for (let i = 0; i < listeners.length; i++) {
			const listener = listeners[i] as Listener<T[K]>;
			const callback = listener[0];
			const thisValue = listener[1];

			try {
				callback.call(thisValue, ...value);
			} catch (error) {
				errors.push(new CallbackError(event, error));
			}
		}

		if (errors.length > 0) {
			throw new EmitingErrors(event, errors);
		}
	}
}
