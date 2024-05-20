export class UserInfo {
	id: number;
	firstName?: string;
	lastName?: string;
	pseudonym: string;
	imgUrl: string;

	constructor(id: number, pseudonym: string, imgUrl: string) {
		this.id = id;
		this.firstName = this.firstName;
		this.lastName = this.lastName;
		this.pseudonym = pseudonym;
		this.imgUrl = imgUrl;
	}
}
