export class Testimonial {
	id: string;
	user: string;
	title: string;
	message: string;
	note: number;

	constructor(
		id: string,
		user: string,
		title: string,
		message: string,
		note: number,
	) {
		this.id = id;
		this.user = user;
		this.title = title;
		this.message = message;
		this.note = note;
	}
}
