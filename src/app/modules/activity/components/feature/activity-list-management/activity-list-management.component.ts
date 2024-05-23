import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Category } from '@shared/models/classes/category.class';
import { Activity } from '@shared/models/types/activity.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { Observable, map } from 'rxjs';

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
	@Input() selectedCategoryId!: Category;

	constructor(
		private activityService: ActivityService,
		private categoryService: CategoryService,
		private _authService: AuthService,
	) {}
	ngOnInit(): void {
		if (!this.connectedUser) {
			this._authService.setConnectedUserData(
				JSON.parse(localStorage.getItem('user') as string),
			);
			this.connectedUser = this._authService.getConnectedUserData();
		}

		this.filterActivities();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes[`searchedValue`] || changes[`selectedCategoryId`]) {
			this.filterActivities();
		}
	}

	filterActivities(): void {
		console.log(this.selectedCategoryId);
		if (this.selectedCategoryId) {
			this.activityList$ = this.activityService.filteredActivityListByCategory$(
				this.selectedCategoryId,
			);
		} else {
			this.activityList$ = this.activityService.getActivityList$();
		}
		this.activityList$ = this.activityList$.pipe(
			map(activities =>
				activities.filter(activity =>
					activity.name
						.toLowerCase()
						.includes(this.searchedValue.toLowerCase()),
				),
			),
		);
	}

	getCategoryTitle(categoryId: string): Observable<string> {
		return this.categoryService.getCategoryById$(categoryId);
	}
}
