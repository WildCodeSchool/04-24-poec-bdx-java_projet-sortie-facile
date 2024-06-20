import { Activity } from '@activity/models/classes/activity.class';

export type CalendarEvent = {
	title: string;
	start: string | Date;
	color: string;
	extendedProps: {
		activity: Activity;
		activityId: number;
	};
};
