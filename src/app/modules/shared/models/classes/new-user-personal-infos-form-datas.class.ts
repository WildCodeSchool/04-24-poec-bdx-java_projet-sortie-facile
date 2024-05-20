import { City } from './city.class';
import { Department } from './department.class';

export class NewUserPersonalInfosFormDatas {
	id: string;
	firstname: string;
	lastname: string;
	description: string;
	city: City;
	categoryIds: string[];
	department: Department;

	constructor(
		id: string,
		firstname: string,
		lastname: string,
		description: string,
		city: City,
		categoryIds: string[],
		department: Department,
	) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.description = description;
		this.city = city;
		this.categoryIds = categoryIds;
		this.department = department;
	}
}
