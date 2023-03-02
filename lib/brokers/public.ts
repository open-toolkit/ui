import { BaseBroker } from "./base";

export class PublicBroker<T> extends BaseBroker<T> {
	public constructor(topics: (keyof T)[]) {
		super(topics);
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
}
