import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-activity-list-management',
	templateUrl: './activity-list-management.component.html',
	styleUrl: './activity-list-management.component.scss',
})
export class ActivityListManagementComponent implements OnInit, OnChanges {
	activityList$!: Observable<Activity[]>;
	activity$!: Observable<Activity>;

	connectedUser!: UserAuthPrimaryDatas;

	@Input() searchedValue: string = '';

	constructor(
		private activityService: ActivityService,
		private _authService: AuthService,
	) {}

	ngOnChanges(): void {
		this.activityList$ = this.activityService.filteredActivityList$(
			this.searchedValue,
		);
	}

	ngOnInit(): void {
		if (!this.connectedUser) {
			this._authService.setConnectedUserData(
				JSON.parse(localStorage.getItem('user') as string),
			);
			this.connectedUser = this._authService.getConnectedUserData();
		}

		this.activityList$ = this.activityService.getActivityList$();
	}

	getCategoryTitle(categoryId: number): Observable<string> {
		return this.activityService.getCategoryById$(categoryId);
	}
}
