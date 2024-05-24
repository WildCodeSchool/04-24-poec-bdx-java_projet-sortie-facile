import { Category } from '@models/types/category.type';
import { City } from '@models/types/city.type';
import { Department } from '../classes/department.class';

export type Activity = {
	id: string;
	name: string;
	department: Department;
	activityCity: City;
	date: string;
	age?: number;
	imgUrl?: string;
	link?: string;
	description: string;
	nbGuest: number;
	categoryId: Category;
	hour: string;
	userId: string;
};

export type NewActivity = Omit<Activity, 'id'>;
