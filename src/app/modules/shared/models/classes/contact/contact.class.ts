export class Contact {
	id: number;
	email: string;
	title: string;
	message: string;
	read: boolean;

	constructor(id: number, email: string, title: string, message: string) {
		this.id = id;
		this.email = email;
		this.title = title;
		this.message = message;
		this.read = false;
	}
}
