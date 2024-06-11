export class Activity {
	id: string;
	name: string;
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	hour: string;
	region: number;
	department: number;
	activityCity: number;
	categoryId: number;

	// userId: string;
	isVisible: boolean;

	constructor(
		id: string,
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
		activityCity: number,
		categoryId: number,
		// userId: string,
		isVisible: boolean,
	) {
		this.id = id;
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
		this.activityCity = activityCity;
		this.categoryId = categoryId;
		// this.userId = userId;
		this.isVisible = isVisible;
	}
}
