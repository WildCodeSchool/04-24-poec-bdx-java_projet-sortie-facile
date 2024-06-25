export class NewActivityInput {
	name: string;
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	isVisible: boolean;

	constructor(
		name: string,
		date: string,
		age: number,
		imgUrl: string,
		link: string,
		description: string,
		nbGuest: number,
		isVisible: boolean,
	) {
		this.name = name;
		this.date = date;
		this.age = age;
		this.imgUrl = imgUrl;
		this.link = link;
		this.description = description;
		this.nbGuest = nbGuest;
		this.isVisible = isVisible;
	}
}
