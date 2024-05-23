import { Category } from '@shared/models/classes/category.class';
import { City } from '@shared/models/classes/city.class';

export class Activity {
	id: string;
	name: string;
	departement: string;
	activityCity: City;
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	categoryId: Category;
	hour: string;
	userId: string;
	isVisible: boolean;

	constructor(
		id: string,
		name: string,
		departement: string,
		activityCity: City,
		date: string,
		age: number,
		imgUrl: string,
		link: string,
		description: string,
		nbGuest: number,
		categoryId: Category,
		hour: string,
		userId: string,
		isVisible: boolean,
	) {
		this.id = id;
		this.name = name;
		this.departement = departement;
		this.activityCity = activityCity;
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
