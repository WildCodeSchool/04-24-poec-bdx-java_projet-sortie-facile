export class NewActivityInput {
	name: string;
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	hour: string;
	isVisible: boolean;
	// category: number;

	constructor(
		name: string,
		date: string,
		age: number,
		imgUrl: string,
		link: string,
		description: string,
		nbGuest: number,
		hour: string,
		isVisible: boolean,
		// category: number,
	) {
		this.name = name;
		this.date = date;
		this.age = age;
		this.imgUrl = imgUrl;
		this.link = link;
		this.description = description;
		this.nbGuest = nbGuest;
		this.hour = hour;
		this.isVisible = isVisible;
		// this.category = category;
	}
}
