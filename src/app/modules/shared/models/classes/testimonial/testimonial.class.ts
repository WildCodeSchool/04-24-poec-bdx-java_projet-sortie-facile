export class Testimonial {
	id: string;
	user: string;
	title: string;
	message: string;
	note: number;
	imgUrl: string;

	constructor(
		id: string,
		user: string,
		title: string,
		message: string,
		note: number,
		imgUrl: string,
	) {
		this.id = id;
		this.user = user;
		this.title = title;
		this.message = message;
		this.note = note;
		this.imgUrl = imgUrl;
	}
}
