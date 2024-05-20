import { Activity } from '@activity/models/classes/activity.class';
import { UserDetails } from '../types/user-details.type';

export class Booking {
	id: string;
	activityId: Activity;
	userId: UserDetails;

	constructor(id: string, userId: UserDetails, activityId: Activity) {
		this.id = id;
		this.userId = userId;
		this.activityId = activityId;
	}
}
