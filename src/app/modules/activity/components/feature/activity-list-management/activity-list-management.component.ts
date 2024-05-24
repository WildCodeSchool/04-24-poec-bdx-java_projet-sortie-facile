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
	pagedActivities: Activity[] = [];
	connectedUser!: UserAuthPrimaryDatas;

	@Input() searchedValue: string = '';
	@Input() selectedCategoryId!: Category;
	@Input({ required: true }) selectedDepartments!: Department;

	rows: number = 2;
	first: number = 0;
	totalRecords: number = 0;

	rowsPerPageOptions = [
		{ label: '1', value: 1 },
		{ label: '2', value: 2 },
		{ label: '3', value: 3 },
	];

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
			console.log('ooooooooooo');

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

	onPageChange(event: any): void {
		this.first = event.first;
		this.rows = event.rows;
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
	onActivityHidden(activity: Activity): void {
		// Mettez à jour la liste des activités après avoir masqué une activité
		this.filterActivities();
	}
}
