import { UserGenderEnum } from '@shared/models/enums/user-genre.enum';

export class NewUserUserDetailsFormDatas {
	firstname: string;
	lastname: string;
	streetNumber: string;
	street: string;
	region: number;
	postalCode: number;
	description: string;
	department: number;
	city: number;
	avatar: string;
	phone: string;
	dateOfBirth: string;
	genre: UserGenderEnum;
	categoryIds: number[];
	userId: string;

	constructor(
		firstname: string,
		lastname: string,
		streetNumber: string,
		street: string,
		region: number,
		postalCode: number,
		description: string,
		department: number,
		city: number,
		avatar: string,
		phone: string,
		dateOfBirth: string,
		genre: UserGenderEnum,
		categoryIds: number[],
		userId: string,
	) {
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
