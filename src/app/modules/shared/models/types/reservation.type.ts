import { UserDetails } from '@models/types/user-details.type';
import { Activity } from '@models/types/activity.type';

export type reservation = {
	id: string;
	userId: UserDetails;
	activityId: Activity;
};
