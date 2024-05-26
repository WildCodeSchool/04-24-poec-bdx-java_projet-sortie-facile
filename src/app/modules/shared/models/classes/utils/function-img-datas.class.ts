export class FunctionimgDatas {
	imgSrc: string;
	imgAlt: string;
	title: string;
	description: string;
	link: string[];
	linkLabel: string;

	constructor(
		imgSrc: string,
		imgAlt: string,
		title: string,
		description: string,
		link: string[],
		linkLabel: string,
	) {
		this.imgSrc = imgSrc;
		this.imgAlt = imgAlt;
		this.title = title;
		this.description = description;
		this.link = link;
		this.linkLabel = linkLabel;
	}
}
