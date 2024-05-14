import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { tap } from 'rxjs';

@Component({
	selector: 'app-account-activities-management',
	templateUrl: './account-activities-management.component.html',
	styleUrl: './account-activities-management.component.scss',
})
export class AccountActivitiesManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;
	activityList!: Activity[];

	connectedUser!: UserAuthPrimaryDatas;

	constructor(
		private _authService: AuthService,
		private _activityService: ActivityService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this._activityService
			.getActivityList$()
			.pipe(
				tap(activities => {
					this.activityList = activities;
				}),
			)
			.subscribe();
	}
}
