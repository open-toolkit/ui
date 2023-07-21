export type Callback<T> = (value: T) => any;

export interface CallbackHolder {
	topic: number[];
	callback: Callback<any>;
	thisArg: any;
}

export class BaseBroker<T> {
	protected topics: Map<keyof T, number[]>;
	protected callbacks: Map<number, CallbackHolder>;

	private nextUID: number;
	public constructor(topics: (keyof T)[]) {
		this.topics = new Map();
		this.callbacks = new Map();

		for (const topicName of topics) {
			this.topics.set(topicName, []);
		}

		this.nextUID = 0;
	}

	public subscribe<K extends keyof T>(topicName: K, callback: Callback<T[K]>, thisArg: any): number {
		const tmp = this.nextUID;

		this.nextUID++;

		const topic = this.topics.get(topicName);

		if (topic === undefined) {
			throw new Error("No topic named: " + topicName.toString());
		}

		topic.push(tmp);

		const holder: CallbackHolder = {
			topic,
			callback,
			thisArg,
		};

		this.callbacks.set(tmp, holder);

		return tmp;
	}

	public unsubscribe(uid: number): void {
		const holder = this.callbacks.get(uid);

		if (typeof holder === "undefined") return;

		const index = holder.topic.indexOf(uid);

		if (index === -1) return;

		holder.topic.splice(index, 1);

		this.callbacks.delete(uid);
	}
}
