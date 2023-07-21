import { Store } from "../libs/store";
import { Module } from "../models/module";

export class ModuleStore extends Store<Module, string> {
	public constructor() {
		super();
	}
}
