import { Activity } from '@activity/models/classes/activity.class';
import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Category } from '@shared/models/classes/category.class';
import { Department } from '@shared/models/classes/department.class';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { DepartmentService } from '@shared/services/department.service';
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
	@Input() selectedDepartments!: Department;

	constructor(
		private activityService: ActivityService,
		private categoryService: CategoryService,
		private departmentService: DepartmentService,
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
		if (
			changes['searchedValue'] ||
			changes['selectedCategoryId'] ||
			changes['selectedDepartments']
		) {
			this.filterActivities();
		}
	}

	filterActivities(): void {
		console.log('Selected Category:', this.selectedCategoryId);
		console.log('Selected Departments:', this.selectedDepartments);

		if (this.selectedCategoryId) {
			this.activityList$ = this.activityService
				.filteredActivityListByCategory$(this.selectedCategoryId)
				.pipe(
					map(activities =>
						activities.filter(activity =>
							activity.name
								.toLowerCase()
								.includes(this.searchedValue.toLowerCase()),
						),
					),
				);
		} else if (this.selectedDepartments) {
			this.activityList$ = this.activityService
				.filteredActivityListByDepartment$(this.selectedDepartments)
				.pipe(
					map(activities => {
						console.log(
							'Activities before filtering by department:',
							activities,
						);
						return activities.filter(activity =>
							activity.name
								.toLowerCase()
								.includes(this.searchedValue.toLowerCase()),
						);
					}),
					map(activities => {
						const filteredActivities = activities.filter(
							activity => activity.department === this.selectedDepartments.id,
						);
						console.log(
							'Filtered activities by department:',
							filteredActivities,
						);
						return filteredActivities;
					}),
				);
		} else {
			this.activityList$ = this.activityService
				.getActivityList$()
				.pipe(
					map(activities =>
						activities.filter(activity =>
							activity.name
								.toLowerCase()
								.includes(this.searchedValue.toLowerCase()),
						),
					),
				);
		}
	}

	getCategoryTitle(categoryId: string): Observable<string> {
		return this.categoryService.getCategoryById$(categoryId);
	}
}
