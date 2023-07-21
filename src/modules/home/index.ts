import { ObservableArray } from "../../libs/observable";
import { Module } from "../../models/module";
import { AppView } from "./views/app/index";
import { Card } from "./models/card";

const card0 = new Card({
	id: 0,
	title: "card0",
	description: "card0 description",
});

const card1 = new Card({
	id: 1,
	title: "card1",
	description: "card1 description",
});

const card2 = new Card({
	id: 2,
	title: "card2",
	description: "card2 description",
});

const card3 = new Card({
	id: 3,
	title: "card3",
	description: "card3 description",
});

const cards = new ObservableArray<Card>([card0, card1, card2]);
const app = new AppView(cards);

setTimeout(() => {
	cards.remove(card0);
	cards.add(card3);
}, 3000);

export default new Module({
	name: "Home",
	content: app.get(),
});
