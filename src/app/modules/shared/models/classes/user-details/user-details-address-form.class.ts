export class UserProfileAddressForm {
	regionName: string;
	departmentName: string;
	streetNumber: string;
	street: string;
	postalCode: number;
	cityName: string;
	email: string;

	constructor(
		regionName: string,
		departmentName: string,
		streetNumber: string,
		street: string,
		postalCode: number,
		cityName: string,
		email: string,
	) {
		this.regionName = regionName;
		this.departmentName = departmentName;
		this.streetNumber = streetNumber;
		this.street = street;
		this.postalCode = postalCode;
		this.cityName = cityName;
		this.email = email;
	}
}
