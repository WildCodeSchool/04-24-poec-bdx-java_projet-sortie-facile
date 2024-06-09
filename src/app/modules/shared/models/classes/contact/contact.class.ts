export class Contact {
	id: string;
	email: string;
	title: string;
	message: string;
	read: boolean;
	constructor(id: string, email: string, title: string, message: string) {
		this.id = id;
		this.email = email;
		this.title = title;
		this.message = message;
		this.read = false;
	}
}
