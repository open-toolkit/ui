import { Model } from "@lib/model";

export interface ModuleDTO {
	name: string;
}

export class Module extends Model<ModuleDTO> {
	public constructor(dto: ModuleDTO) {
		super({ name: { type: ["string"], default: "no name" } }, dto);
	}
}
