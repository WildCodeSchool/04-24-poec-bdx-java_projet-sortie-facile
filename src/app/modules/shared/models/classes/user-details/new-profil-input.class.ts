export class NewProfileInput {
	firstname: string;
	lastname: string;
	streetNumber: string;
	street: string;
	postalCode: number;
	description: string;
	avatar: string;
	phone: string;
	dateOfBirth: string;

	constructor(
		firstname: string,
		lastname: string,
		streetNumber: string,
		street: string,
		postalCode: number,
		description: string,
		avatar: string,
		phone: string,
		dateOfBirth: string,
	) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.streetNumber = streetNumber;
		this.street = street;
		this.postalCode = postalCode;
		this.description = description;
		this.avatar = avatar;
		this.phone = phone;
		this.dateOfBirth = dateOfBirth;
	}
}
