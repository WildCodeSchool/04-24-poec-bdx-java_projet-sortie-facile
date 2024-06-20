export class Booking {
	id: number;
	activityId: number;
	profileId: number;

	constructor(id: number, profileId: number, activityId: number) {
		this.id = id;
		this.profileId = profileId;
		this.activityId = activityId;
	}
}
