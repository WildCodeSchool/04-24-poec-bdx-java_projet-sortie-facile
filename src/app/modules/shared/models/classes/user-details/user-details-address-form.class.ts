export class UserProfileAddressForm {
	regionId: number;
	departmentId: number;
	streetNumber: string;
	street: string;
	postalCode: number;
	cityId: number;
	email: string;

	constructor(
		regionId: number,
		departmentId: number,
		streetNumber: string,
		street: string,
		postalCode: number,
		cityId: number,
		email: string,
	) {
		this.regionId = regionId;
		this.departmentId = departmentId;
		this.streetNumber = streetNumber;
		this.street = street;
		this.postalCode = postalCode;
		this.cityId = cityId;
		this.email = email;
	}
}
