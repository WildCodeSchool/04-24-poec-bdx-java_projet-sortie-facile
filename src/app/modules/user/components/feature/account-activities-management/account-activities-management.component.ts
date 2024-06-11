import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-account-activities-management',
	templateUrl: './account-activities-management.component.html',
	styleUrl: './account-activities-management.component.scss',
})
export class AccountActivitiesManagementComponent
	extends BaseAccountManagementComponent
	implements OnInit
{
	activityByCreatedUserList$!: Observable<Activity[]>;
	activityParticipateList$!: Observable<Activity[]>;

	constructor(
		protected override _authService: AuthService,
		protected override _tokenService: TokenService,
		private _activityService: ActivityService,
	) {
		super(_authService, _tokenService);
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
