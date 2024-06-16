export class Activity {
	id: number;
	name: string;
	regionId: number;
	departmentId: number;
	cityId: number;
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	category: number;
	hour: string;
	userId: string;
	isVisible: boolean;

	constructor(
		id: number,
		name: string,
		regionId: number,
		departmentId: number,
		cityId: number,
		date: string,
		age: number,
		imgUrl: string,
		link: string,
		description: string,
		nbGuest: number,
		category: number,
		hour: string,
		userId: string,
		isVisible: boolean,
	) {
		this.id = id;
		this.name = name;
		this.regionId = regionId;
		this.departmentId = departmentId;
		this.cityId = cityId;
		this.date = date;
		this.age = age;
		this.imgUrl = imgUrl;
		this.link = link;
		this.description = description;
		this.nbGuest = nbGuest;
		this.category = category;
		this.hour = hour;
		this.userId = userId;
		this.isVisible = isVisible;
	}
}
