export class NewActivity {
	name: string;
	department: number;
	region: number;
	city: number;
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	categoryId: number;
	hour: string;
	userId: string;
	isVisible: boolean;

	constructor(
		name: string,
		department: number,
		region: number,
		city: number,
		date: string,
		age: number,
		imgUrl: string,
		link: string,
		description: string,
		nbGuest: number,
		categoryId: number,
		hour: string,
		userId: string,
		isVisible: boolean,
	) {
		this.name = name;
		this.department = department;
		this.region = region;
		this.city = city;
		this.date = date;
		this.age = age;
		this.imgUrl = imgUrl;
		this.link = link;
		this.description = description;
		this.nbGuest = nbGuest;
		this.categoryId = categoryId;
		this.hour = hour;
		this.userId = userId;
		this.isVisible = isVisible;
	}
}
