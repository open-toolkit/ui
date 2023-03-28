import type { PartialDeep } from "type-fest";

type Types = "string" | "number" | "boolean" | "undefined";

type ModelConfig<T> = {
	[K in keyof T]:
		| { type: "object"; fields: ModelConfig<T[K]> }
		| { type: Types[]; default: T[K] }
		| { type: "any"; default?: any };
};

export class Model<T> {
	protected dto: T;
	protected config: ModelConfig<T>;

	public constructor(config: ModelConfig<T>, dto?: PartialDeep<T>) {
		this.config = config;
		this.dto = this.initialise(config);

		if (dto) this.update(dto);
	}

	protected initialise(config: ModelConfig<any>, thisDto: any = {}): T {
		for (const key in config) {
			const conf = config[key];

			if (conf.type === "object") {
				thisDto[key] = this.initialise(conf.fields, {});
				continue;
			}

			thisDto[key] = conf.default;
		}

		return thisDto;
	}

	public get(): T {
		return this.dto;
	}

	public update(dto: PartialDeep<T>): void {
		this.updateRecursive(this.config, dto, this.dto);
	}

	protected updateRecursive(config: ModelConfig<any>, dto: PartialDeep<any>, thisDto: any): void {
		for (const key in config) {
			const conf = config[key];

			if (conf.type === "object") {
				if (typeof dto[key] !== "object") continue;

				thisDto[key] = this.updateRecursive(conf.fields, dto[key], thisDto[key]);
				continue;
			}

			if (conf.type === "any") {
				thisDto[key] = dto[key];
				continue;
			}

			if (conf.type.includes(typeof dto[key] as Types)) {
				thisDto[key] = dto[key];
			}
		}
	}
}
