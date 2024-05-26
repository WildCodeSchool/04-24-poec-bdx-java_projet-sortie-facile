import { Activity } from '@activity/models/classes/activity.class';
import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Department } from '@shared/models/classes/address/department.class';
import { Category } from '@shared/models/classes/category/category.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { CategoryService } from '@shared/services/category.service';
import { Observable, map } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

@Component({
	selector: 'app-activity-list-management',
	templateUrl: './activity-list-management.component.html',
	styleUrl: './activity-list-management.component.scss',
})
export class ActivityListManagementComponent implements OnInit, OnChanges {
	activityList$!: Observable<Activity[]>;
	activity$!: Observable<Activity>;
	pagedActivities: Activity[] = [];
	connectedUser!: AuthUserPrimaryDatas;

	@Input() searchedValue: string = '';
	@Input() selectedCategoryId!: Category;
	@Input({ required: true }) selectedDepartments!: Department;

	rows: number = 8;
	first: number = 0;
	totalRecords: number = 0;

	rowsPerPageOptions = [
		{ label: '4', value: 4 },
		{ label: '12', value: 12 },
		{ label: '20', value: 20 },
	];

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
		if (
			changes['searchedValue'] ||
			changes['selectedCategoryId'] ||
			changes['selectedDepartments']
		) {
			this.filterActivities();
		}
	}

	filterActivities(): void {
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

		this.activityList$ = this.activityList$.pipe(
			map(activities =>
				activities.filter(activity =>
					activity.name
						.toLowerCase()
						.includes(this.searchedValue.toLowerCase()),
				),
			),
		);

		this.activityList$.subscribe(activities => {
			this.totalRecords = activities.length;
			this.updatePageActivities(activities);
		});
	}

	onPageChange(event: LazyLoadEvent): void {
		this.first = event.first as number;
		this.rows = event.rows as number;
		this.activityList$.subscribe(activities => {
			this.updatePageActivities(activities);
		});
	}

	onRowsChange(): void {
		this.first = 0;

		this.activityList$.subscribe(activities => {
			this.updatePageActivities(activities);
		});
	}

	updatePageActivities(activities: Activity[]): void {
		this.pagedActivities = activities.slice(this.first, this.first + this.rows);
	}

	getCategoryTitle(categoryId: string): Observable<string> {
		return this.categoryService.getCategoryById$(categoryId);
	}

	onActivityHidden(): void {
		this.filterActivities();
	}
}
