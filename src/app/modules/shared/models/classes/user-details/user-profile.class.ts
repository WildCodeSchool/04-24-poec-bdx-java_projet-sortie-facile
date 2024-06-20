import { UserGenderEnum } from '@shared/models/enums/user-genre.enum';

export class UserProfile {
	id: number;
	firstname: string;
	lastname: string;
	regionName: string;
	departmentName: string;
	streetNumber: string;
	street: string;
	postalCode: number;
	cityName: string;
	description: string;
	avatar: string;
	phone: string;
	dateOfBirth: string;
	genre: UserGenderEnum;
	categoryIds: number[];
	userId: number;

	constructor(
		id: number,
		firstname: string,
		lastname: string,
		regionName: string,
		departmentName: string,
		streetNumber: string,
		street: string,
		postalCode: number,
		cityName: string,
		description: string,
		avatar: string,
		phone: string,
		dateOfBirth: string,
		genre: UserGenderEnum,
		categoryIds: number[],
		userId: number,
	) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.departmentName = departmentName;
		this.regionName = regionName;
		this.streetNumber = streetNumber;
		this.street = street;
		this.postalCode = postalCode;
		this.cityName = cityName;
		this.description = description;
		this.avatar = avatar;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;
		this.genre = genre;
		this.categoryIds = categoryIds;
		this.userId = userId;
	}
}
