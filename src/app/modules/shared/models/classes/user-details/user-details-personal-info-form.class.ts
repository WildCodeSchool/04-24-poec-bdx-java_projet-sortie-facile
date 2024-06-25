import { UserGenderEnum } from '@shared/models/enums/user-genre.enum';

export class UserProfilePersonalInfosForm {
	firstname: string;
	lastname: string;
	phone: string;
	dateOfBirth: string;
	genre: UserGenderEnum;
	email: string;

	constructor(
		firstname: string,
		lastname: string,
		phone: string,
		dateOfBirth: string,
		genre: UserGenderEnum,
		email: string,
	) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;
		this.genre = genre;
		this.email = email;
	}
}
