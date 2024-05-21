import { Component, Input, OnDestroy } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
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

	delete(id: string): void {
		this._subscription.add(
			this.activityService.deleteActivity$(id).subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
