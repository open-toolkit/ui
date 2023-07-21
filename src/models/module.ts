import { Model } from "../libs/model";

export interface ModuleDTO {
	name: string;
	content: HTMLElement;
}

export class Module extends Model<ModuleDTO> {
	public constructor(dto: ModuleDTO) {
		super({ name: { type: ["string"], default: "no name" }, content: { type: "any" } }, dto);
	}
}
