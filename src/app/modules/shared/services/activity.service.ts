import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Department } from '@shared/models/classes/address/department.class';
import { Activity } from '@activity/models/classes/activity.class';
import { ActivityListResponseApi } from '@shared/models/classes/activity';
import { Category } from '@shared/models/classes/category/category.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { BookingService } from './booking.service';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';
import { environment } from 'environments/environment';
import { NewActivity } from '@activity/models/classes/new-activity.class';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	activity!: Activity;
	activities!: ActivityListResponseApi;
	category!: Category;
	categories!: Category[];
	department!: Department;

	private readonly _BASE_URL = `${environment.apiUrl}/activity`;

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
		private _bookingService: BookingService,
	) {}

	getActivityList$(): Observable<ActivityListResponseApi> {
		return this._httpClient
			.get<ActivityListResponseApi>(`${this._BASE_URL}/all`)
			.pipe(
				map((activities: ActivityListResponseApi) =>
					activities.filter(activity => activity.isVisible !== true),
				),
				catchError(error => {
					throw error;
				}),
			);
	}

	getActivityById$(id: string): Observable<Activity> {
		return this._httpClient
			.get<Activity>(`${this._BASE_URL}/${id}`)
			.pipe(map((activity: Activity) => activity));
	}

	getActivityListByCreatedUser$(
		limit: number = -1,
		userId: number,
	): Observable<ActivityListResponseApi> {
		return this._httpClient.get<ActivityListResponseApi>(this._BASE_URL).pipe(
			// map((activities: ActivityListResponseApi) =>
			// 	activities.filter(activity => activity.userId === userId).reverse(),
			// ),
			map((activities: ActivityListResponseApi) =>
				limit > 0 ? activities.slice(0, limit) : activities,
			),
		);
	}

	getListOfActivitiesRegisteredByUser$(
		limit: number = -1,
		userId: string,
	): Observable<Activity[]> {
		return this._bookingService.getBookingListByUser$(userId).pipe(
			map((bookingList: BookingUserActivity[]) =>
				bookingList.map(booking => booking.activity as Activity).reverse(),
			),
			map((activityList: Activity[]) =>
				limit > 0 ? activityList.slice(0, limit) : activityList,
			),
		);
	}

	filteredActivityList$(name: string): Observable<ActivityListResponseApi> {
		return this.getActivityList$().pipe(
			map((activityList: ActivityListResponseApi) =>
				activityList.filter((activity: Activity) =>
					activity.name.toLowerCase().includes(name.toLowerCase()),
				),
			),
		);
	}

	filteredActivityListByCategory$(
		categoryId: Category,
	): Observable<ActivityListResponseApi> {
		return this.getActivityList$().pipe(
			map((activityList: ActivityListResponseApi) =>
				activityList.filter((activity: Activity) => {
					return activity.categoryId === Number(categoryId.id);
				}),
			),
		);
	}

	filteredActivityListByDepartment$(
		department: Department,
	): Observable<ActivityListResponseApi> {
		return this.getActivityList$().pipe(
			map((activityList: ActivityListResponseApi) =>
				activityList.filter((activity: Activity) => {
					return activity.department === Number(department.id);
				}),
			),
		);
	}

	postNewActivity$(newActivity: NewActivity): Observable<Activity> {
		const activityToPost: NewActivity = {
			...newActivity,
			isVisible: true,
		};

		const cloneActivityToPost: any = { ...activityToPost };
		delete cloneActivityToPost.departmentId;
		delete cloneActivityToPost.activityCity;
		delete cloneActivityToPost.departmentId;

		return this._httpClient
			.post<Activity>(
				`${this._BASE_URL}/add/region/1/department/1/city/1`,
				// {
				// 	name: 'totoss',
				// 	date: 'today',
				// 	age: 22,
				// 	imgUrl: 'string',
				// 	link: 'string',
				// 	description: 'string',
				// 	nbGuest: 5,
				// 	hour: 'now',
				// 	isVisible: true,
				// },
				cloneActivityToPost,
			)
			.pipe(
				tap((activity: Activity) => {
					this._router.navigate([FullActivityRouteEnum.DETAILS, activity.id]);
				}),
				catchError(error => {
					throw error;
				}),
			);
	}

	deleteActivity$(id: string): Observable<unknown> {
		return this._httpClient.delete(`${this._BASE_URL}/${id}`).pipe(
			catchError(error => {
				throw error;
			}),
		);
	}
	updateActivityVisibility(
		activityId: number,
		isVisible: boolean,
	): Observable<Activity> {
		return this._httpClient.patch<Activity>(`${this._BASE_URL}/${activityId}`, {
			isVisible,
		});
	}

	getVisibleActivities(): Observable<ActivityListResponseApi> {
		return this._httpClient
			.get<ActivityListResponseApi>(this._BASE_URL)
			.pipe(
				map((activities: ActivityListResponseApi) =>
					activities.filter(activity => activity.isVisible),
				),
			);
	}

	updateActivity$(
		id: number,
		updatedData: Partial<Activity>,
	): Observable<Activity> {
		return this._httpClient
			.patch<Activity>(`${this._BASE_URL}/${id}`, updatedData)
			.pipe(
				catchError(error => {
					throw error;
				}),
			);
	}
}
