import { UserGenderEnum } from '@shared/models/enums/user-genre.enum';

export class UserProfile {
	id: number;
	firstname: string;
	lastname: string;
	regionId: number;
	departmentId: number;
	streetNumber: string;
	street: string;
	postalCode: number;
	cityId: number;
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
		regionId: number,
		departmentId: number,
		streetNumber: string,
		street: string,
		postalCode: number,
		cityId: number,
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
		this.departmentId = departmentId;
		this.regionId = regionId;
		this.streetNumber = streetNumber;
		this.street = street;
		this.postalCode = postalCode;
		this.cityId = cityId;
		this.description = description;
		this.avatar = avatar;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;
		this.genre = genre;
		this.categoryIds = categoryIds;
		this.userId = userId;
	}
}
