import { Store } from "@lib/store";
import { Module } from "@src/models/module";

export class ModuleStore extends Store<Module, string> {
	public constructor() {
		super()
	}
}
