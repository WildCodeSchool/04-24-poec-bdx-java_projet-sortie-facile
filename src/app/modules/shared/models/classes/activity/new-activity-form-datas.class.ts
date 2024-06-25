export class NewActivityFormDatas {
	name: string;
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	hour: string;
	category: number;
	region: number;
	department: number;
	city: number;

	constructor(
		name: string,
		date: string,
		age: number,
		imgUrl: string,
		link: string,
		description: string,
		nbGuest: number,
		hour: string,
		region: number,
		department: number,
		city: number,
		category: number,
	) {
		this.name = name;
		this.date = date;
		this.age = age;
		this.imgUrl = imgUrl;
		this.link = link;
		this.description = description;
		this.nbGuest = nbGuest;
		this.hour = hour;
		this.region = region;
		this.department = department;
		this.city = city;
		this.category = category;
	}
}
