import { UserGenderEnum } from '@shared/models/enums/user-genre.enum';
import { City } from '@shared/models/classes/address/city.class';
import { Department } from '@shared/models/classes/address/department.class';
import { Region } from '@shared/models/classes/address/region.class';

export class UserDetailsPatch {
	id?: string;
	firstname?: string;
	lastname?: string;
	region?: Region;
	department?: Department;
	streetNumber?: string;
	street?: string;
	postalCode?: number;
	city?: City;
	description?: string;
	avatar?: string;
	phone?: string;
	dateOfBirth?: string;
	genre?: UserGenderEnum;
	categoryIds?: string[];
	userId?: string;

	constructor(
		id: string,
		firstname: string,
		lastname: string,
		region: Region,
		department: Department,
		streetNumber: string,
		street: string,
		postalCode: number,
		city: City,
		description: string,
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
		this.department = department;
		this.region = region;
		this.streetNumber = streetNumber;
		this.street = street;
		this.postalCode = postalCode;
		this.city = city;
		this.description = description;
		this.avatar = avatar;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;
		this.genre = genre;
		this.categoryIds = categoryIds;
		this.userId = userId;
	}
}
