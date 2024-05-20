import { City } from './city.class';

export class NewUserPersonalInfosFormDatas {
	id: string;
	firstname: string;
	lastname: string;
	description: string;
	city: City;
	categoryIds: string[];

	constructor(
		id: string,
		firstname: string,
		lastname: string,
		description: string,
		city: City,
		categoryIds: string[],
	) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.description = description;
		this.city = city;
		this.categoryIds = categoryIds;
	}
}
