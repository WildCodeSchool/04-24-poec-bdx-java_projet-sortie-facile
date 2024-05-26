import { Activity } from '@activity/models/classes/activity.class';
import { AuthUser } from '../auth-user/auth-user.class';

export class BookingUserActivity {
	id: string;
	userId: string;
	activityId: string;
	user?: AuthUser;
	activity?: Activity;

	constructor(
		id: string,
		userId: string,
		activityId: string,
		user?: AuthUser,
		activity?: Activity,
	) {
		this.id = id;
		this.userId = userId;
		this.activityId = activityId;
		this.user = user;
		this.activity = activity;
	}
}
