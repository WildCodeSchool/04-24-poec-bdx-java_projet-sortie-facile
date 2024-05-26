import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';
import { Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-account-activities-management',
	templateUrl: './account-activities-management.component.html',
	styleUrl: './account-activities-management.component.scss',
})
export class AccountActivitiesManagementComponent
	extends BaseAccountManagementComponent
	implements OnInit, OnDestroy
{
	activityByCreatedUserList!: Activity[];
	activityParticipateList!: Activity[];

	private _subscription: Subscription = new Subscription();

	constructor(
		protected override _authService: AuthService,
		private _activityService: ActivityService,
	) {
		super(_authService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this._activityService
			.getActivityListByCreatedUser$(10, this.connectedUser.id)
			
			.pipe(
				tap(activities => {
					this.activityByCreatedUserList = activities;
				}),
			)
			.subscribe();
		this._subscription.add(
			this._activityService
				.getActivityListByCreatedUser$(10, this.connectedUser.id)
				.pipe(
					tap(activities => {
						this.activityByCreatedUserList = activities;
					}),
				)
				.subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
