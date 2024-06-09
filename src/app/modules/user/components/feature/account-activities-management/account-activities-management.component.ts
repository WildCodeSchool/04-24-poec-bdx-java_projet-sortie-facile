import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-account-activities-management',
	templateUrl: './account-activities-management.component.html',
	styleUrl: './account-activities-management.component.scss',
})
export class AccountActivitiesManagementComponent
	extends BaseManagementComponent
	implements OnInit
{
	activityByCreatedUserList$!: Observable<Activity[]>;
	activityParticipateList$!: Observable<Activity[]>;

	constructor(
		protected override _authService: AuthService,
		private _activityService: ActivityService,
	) {
		super(_authService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.activityByCreatedUserList$ =
			this._activityService.getActivityListByCreatedUser$(
				10,
				this.connectedUser.id,
			);

		this.activityParticipateList$ =
			this._activityService.getListOfActivitiesRegisteredByUser$(
				10,
				this.connectedUser.id,
			);
	}
}
