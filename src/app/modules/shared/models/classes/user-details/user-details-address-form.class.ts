import { City } from '@shared/models/classes/address/city.class';
import { Department } from '@shared/models/classes/address/department.class';
import { Region } from '@shared/models/classes/address/region.class';

export class UserDetailsAddressForm {
	region: Region;
	department: Department;
	streetNumber: string;
	street: string;
	postalCode: number;
	city: City;
	email: string;

	constructor(
		region: Region,
		department: Department,
		streetNumber: string,
		street: string,
		postalCode: number,
		city: City,
		email: string,
	) {
		this.region = region;
		this.department = department;
		this.streetNumber = streetNumber;
		this.street = street;
		this.postalCode = postalCode;
		this.city = city;
		this.email = email;
	}
}
