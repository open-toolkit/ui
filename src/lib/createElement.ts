interface Definition {
	tagName: keyof HTMLElementTagNameMap;
	style?: Partial<
		Omit<
			CSSStyleDeclaration,
			| "length"
			| "parentRule"
			| "getPropertyValue"
			| "getPropertyPriority"
			| "item"
			| "removeProperty"
			| "setProperty"
		>
	>;
	attributes?: { [key: string]: string };
	innerText?: string;
	children?: HTMLElement[];
}

export const createElement = (definition: Definition): HTMLElement => {
	const element = document.createElement(definition.tagName);

	for (const [key, value] of Object.entries(definition.style || {})) {
		if (typeof value !== "string") continue;
		element.style[key] = value;
	}

	if (typeof definition.innerText === "string") {
		element.innerText = definition.innerText;
	}

	for (const child of definition.children || []) {
		element.appendChild(child);
	}

	return element;
};
