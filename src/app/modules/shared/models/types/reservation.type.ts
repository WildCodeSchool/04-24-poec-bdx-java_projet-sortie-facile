import { UserDetails } from './user-details.type';
import { Activity } from './activity.type';

export type reservation = {
	id: string;
	userId: UserDetails;
	activityId: Activity;
};
