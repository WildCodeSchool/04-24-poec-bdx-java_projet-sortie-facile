import { Activity } from '@activity/models/classes/activity.class';
import { AuthUser } from '../auth-user/auth-user.class';

export class BookingUserActivity {
	id: number;
	profileId: number;
	activityId: number;
	user?: AuthUser;
	activity?: Activity;

	constructor(
		id: number,
		profileId: number,
		activityId: number,
		user?: AuthUser,
		activity?: Activity,
	) {
		this.id = id;
		this.profileId = profileId;
		this.activityId = activityId;
		this.user = user;
		this.activity = activity;
	}
}
