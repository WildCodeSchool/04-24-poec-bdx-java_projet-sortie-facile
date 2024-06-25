export class NewBooking {
	activityId: string;
	userId: string;

	constructor(userId: string, activityId: string) {
		this.userId = userId;
		this.activityId = activityId;
	}
}
