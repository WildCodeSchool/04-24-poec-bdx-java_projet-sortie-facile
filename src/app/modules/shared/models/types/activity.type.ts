export type Activity = {
	id: string;
	name: string;
	departement: string;
	city: string;
	date: string;
	age?: number;
	imgUrl?: string;
	link?: string;
	description: string;
	nbGuest: number;
	categoryId: number;
};
export type ActivityCopy = {
	id: string;
	name: string;
	departement: string;
	activityCity: {
		id: number;
		name: string;
	};
	date: string;
	age: number;
	imgUrl: string;
	link: string;
	description: string;
	nbGuest: number;
	categoryId: number;
	hour: string;
};
