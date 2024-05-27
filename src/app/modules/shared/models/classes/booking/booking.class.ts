export class Booking {
	id: string;
	activityId: string;
	userId: string;

	constructor(id: string, userId: string, activityId: string) {
		this.id = id;
		this.userId = userId;
		this.activityId = activityId;
	}
}
