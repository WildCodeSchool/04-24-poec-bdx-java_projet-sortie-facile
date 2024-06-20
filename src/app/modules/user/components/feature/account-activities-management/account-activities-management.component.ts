import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AccountService } from '@shared/services/account.service';
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
	navItems: LayoutLink[] = [];
	activityByCreatedUserList$!: Observable<Activity[]>;
	activityParticipateList$!: Observable<Activity[]>;

	constructor(
		protected override _authService: AuthService,
		private _activityService: ActivityService,
		private _accountService: AccountService,
	) {
		super(_authService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.navItems = this._accountService.getLayoutItems();

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
