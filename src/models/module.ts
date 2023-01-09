export interface ModuleDTO {
	name: string
}

export class Module {
	public readonly name: string;

	public constructor(raw: ModuleDTO) {
		this.name = raw.name;
	}
}
