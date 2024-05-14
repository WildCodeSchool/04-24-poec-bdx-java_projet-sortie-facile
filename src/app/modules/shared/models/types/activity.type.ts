import { Category } from '@models/types/category.type';
import { City } from '@models/types/city.type';

export type Activity = {
	id: string;
	name: string;
	departement: string;
	activityCity: City;
	date: string;
	age?: number;
	imgUrl?: string;
	link?: string;
	description: string;
	nbGuest: number;
	categoryId: Category;
};
export type ActivityCopy = {
	id: string;
	name: string;
	departement: string;
	activityCity: {
		id: number;
		name: string;
	};
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	categoryId: Category;
	hour: string;
};
