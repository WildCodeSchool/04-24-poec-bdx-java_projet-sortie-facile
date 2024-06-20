export class Category {
	id: number;
	title: string;
	imgUrl: string;

	constructor(id: number, title: string, imgUrl: string) {
		this.id = id;
		this.title = title;
		this.imgUrl = imgUrl;
	}
}
