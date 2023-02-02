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
	public constructor() {
		this.topics = new Map();
		this.callbacks = new Map();

		this.nextUID = 0;
	}

	public subscribe<K extends keyof T>(topicName: K, callback: Callback<T[K]>, thisArg: any): number {
		const tmp = this.nextUID;

		this.nextUID++;

		const topic = this.genOrGetTopic(topicName);
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

	private genOrGetTopic(topicName: keyof T): number[] {
		let existingTopic = this.topics.get(topicName);

		if (typeof existingTopic === "undefined") {
			existingTopic = [];
			this.topics.set(topicName, existingTopic);
		}

		return existingTopic;
	}
}
