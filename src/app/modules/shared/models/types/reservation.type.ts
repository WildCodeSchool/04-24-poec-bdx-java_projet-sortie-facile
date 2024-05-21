import { Activity } from '@activity/models/classes/activity.class';
import { UserDetails } from '@models/types/user-details.type';

export type reservation = {
	id: string;
	userId: UserDetails;
	activityId: Activity;
};
