export class Contact {
	id: string;
	email: string;
	message: string;

	constructor(id: string, email: string, message: string) {
		this.id = id;
		this.email = email;
		this.message = message;
	}
}
