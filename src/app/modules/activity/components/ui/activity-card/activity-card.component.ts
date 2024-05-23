import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnDestroy } from '@angular/core';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-activity-card',
	templateUrl: './activity-card.component.html',
	styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent implements OnDestroy {
	@Input() activity!: Activity;
	@Input() connectedUser!: UserAuthPrimaryDatas;
	private _subscription: Subscription = new Subscription();

	constructor(private activityService: ActivityService) {}

	// delete(id: string): void {
	// 	this._subscription.add(
	// 		this.activityService.deleteActivity$(id).subscribe(),
	// 	);
	// }
	hideActivity(activityId: string): void {
		this.activityService.updateActivityVisibility(activityId, false).subscribe({
			next: () => {
				console.log('Activity hidden successfully');
				// Actualisez ou mettez à jour la liste des activités après modification si nécessaire
			},
			error: err => console.error('Error hiding activity:', err),
		});
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
