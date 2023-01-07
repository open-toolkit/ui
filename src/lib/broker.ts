type Callback<T> = (value: T) => any;

interface CallbackHolder {
	topic: number[];
	callback: Callback<any>;
	thisArg: any;
}

export class Broker<T> {
	private topics: Map<keyof T, number[]>;
	private callbacks: Map<number, CallbackHolder>;

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

		const holder: CallbackHolder = {
			topic: topic,
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

	public publish<K extends keyof T>(topicName: K, value: T[K]): void {
		const uids = this.topics.get(topicName);

		if (typeof uids === "undefined") return;

		for (const uid of uids) {
			const holder = this.callbacks.get(uid);

			if (typeof holder === "undefined") continue;

			holder.callback.call(holder.thisArg, value);
		}
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
