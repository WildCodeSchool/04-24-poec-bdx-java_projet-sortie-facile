/* eslint-disable no-console */
import { Component, Input } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';

@Component({
	selector: 'app-activity-card',
	templateUrl: './activity-card.component.html',
	styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent {
	@Input() activity!: Activity;
	@Input() connectedUser!: UserAuthPrimaryDatas;

	constructor(private activityService: ActivityService) {}

	delete(id: string): void {
		this.activityService.deleteActivity$(id).subscribe(
			() => {
				console.log('Activity deleted successfully.');
			},
			error => {
				console.error('Error deleting activity:', error);
			},
		);
	}
}
