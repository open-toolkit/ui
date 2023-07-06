import { Observable } from "@lib/observable";

interface DTO {
	id: number;
	title: string;
	description: string;
}

type ObservableObject<T> = {
	[K in keyof T]: Observable<T[K]>;
};

export class Card {
	protected value: Map<string, Observable<unknown>>;

	constructor(initialValue: DTO) {
		this.value = new Map();

		for (const [key, value] of Object.entries(initialValue)) {
			this.value.set(key, new Observable<unknown>(value));
		}
	}

	public get(): ObservableObject<DTO> {
		const obj: any = {};

		for (const [key, value] of this.value.entries()) {
			obj[key] = value;
		}

		return obj;
	}

	public getDTO(): ObservableObject<DTO> {
		const obj: any = {};

		for (const [key, value] of this.value.entries()) {
			try {
				obj[key] = value.get();
			} catch (error) {
				console.error(error);
			}
		}

		return obj;
	}
}
