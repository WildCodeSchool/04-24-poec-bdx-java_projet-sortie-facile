import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-activity-list',
	templateUrl: './activity-list.component.html',
	styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent implements OnInit, OnChanges {
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
