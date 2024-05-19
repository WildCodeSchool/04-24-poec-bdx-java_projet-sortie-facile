import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-account-activities-management',
	templateUrl: './account-activities-management.component.html',
	styleUrl: './account-activities-management.component.scss',
})
export class AccountActivitiesManagementComponent implements OnInit, OnDestroy {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;
	activityByCreatedUserList!: Activity[];
	activityParticipateList!: Activity[];

	connectedUser!: UserAuthPrimaryDatas;
	private _subscription: Subscription = new Subscription();

	constructor(
		private _authService: AuthService,
		private _activityService: ActivityService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this._activityService
			.getActivityListByCreatedUser$(10)
			.pipe(
				tap(activities => {
					this.activityByCreatedUserList = activities;
				}),
			)
			.subscribe();

		this._subscription.add(
			this._activityService
				.getActivityListByCreatedUser$(10)
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
