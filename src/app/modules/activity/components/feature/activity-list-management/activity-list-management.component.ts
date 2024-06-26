import { Activity } from '@activity/models/classes/activity.class';
import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { Department } from '@shared/models/classes/address/department.class';
import { Category } from '@shared/models/classes/category/category.class';
import { ActivityService } from '@shared/services/activity.service';
import { CategoryService } from '@shared/services/category.service';
import { Observable, map } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { PaginationOption } from '@shared/models/types/utils/pagination.type';
import { TokenService } from '@shared/services/token.service';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';

@Component({
	selector: 'app-activity-list-management',
	templateUrl: './activity-list-management.component.html',
	styleUrl: './activity-list-management.component.scss',
})
export class ActivityListManagementComponent implements OnInit, OnChanges {
	fullActivityRoute = FullActivityRouteEnum;

	activityList$!: Observable<Activity[]>;
	activity$!: Observable<Activity>;
	pagedActivities: Activity[] = [];
	connectedUser!: AuthUserResponse;
	showFilterInMobile: boolean = false;
	rowsPerPageOptions!: PaginationOption[];

	@Input() searchedValue: string = '';
	@Input() selectedCategory!: Category;
	@Input({ required: true }) selectedDepartments!: Department;

	@Output() showFilterInMobileEmitter: EventEmitter<boolean> = new EventEmitter(
		this.showFilterInMobile,
	);

	@Output() resetFilterEmitter: EventEmitter<boolean> = new EventEmitter(
		this.showFilterInMobile,
	);

	rows: number = 8;
	first: number = 0;
	totalRecords: number = 0;

	constructor(
		private activityService: ActivityService,
		private categoryService: CategoryService,
		private _tokenService: TokenService,
	) {}

	ngOnInit(): void {
		this.rowsPerPageOptions = [
			{ label: '4', value: 4 },
			{ label: '12', value: 12 },
			{ label: '20', value: 20 },
		];

		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: any) => {
				this.connectedUser = connectedUser;
			});

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
		if (this.selectedCategory) {
			this.activityList$ = this.activityService
				.filteredActivityListByCategory$(this.selectedCategory.id)
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
							activity =>
								Number(activity.departmentId) === this.selectedDepartments.id,
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

	onRowsChange(event: number): void {
		this.first = 0;
		this.rows = event;
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

	onActivityDeleted(): void {
		this.filterActivities();
	}

	onChangeShowFilterInMobile(): void {
		this.showFilterInMobile = !this.showFilterInMobile;
		this.showFilterInMobileEmitter.emit(this.showFilterInMobile);
	}

	onResetFilters(): void {
		this.resetFilterEmitter.emit(true);
	}
}
