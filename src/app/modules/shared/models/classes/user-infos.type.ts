import { UserGenderEnum } from '../enums/user-genre.enum';
import { City } from './city.class';
import { Department } from './department.class';

export class UserInfo {
	id: string;
	firstname: string;
	lastname: string;
	streetNumber: string;
	street: string;
	region: string;
	postalCode: 33000;
	description: string;
	department: Department;
	city: City;
	avatar: string;
	phone: string;
	dateOfBirth: string;
	genre: UserGenderEnum;
	categoryIds: string[];
	userId: string;

	constructor(
		id: string,
		firstname: string,
		lastname: string,
		streetNumber: string,
		street: string,
		region: string,
		postalCode: 33000,
		description: string,
		department: Department,
		city: City,
		avatar: string,
		phone: string,
		dateOfBirth: string,
		genre: UserGenderEnum,
		categoryIds: string[],
		userId: string,
	) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.streetNumber = streetNumber;
		this.street = street;
		this.region = region;
		this.postalCode = postalCode;
		this.description = description;
		this.department = department;
		this.city = city;
		this.avatar = avatar;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;
		this.genre = genre;
		this.categoryIds = categoryIds;
		this.userId = userId;
	}
}
