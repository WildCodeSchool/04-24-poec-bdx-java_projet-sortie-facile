import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Department } from '@shared/models/classes/address/department.class';
import { Activity } from '@activity/models/classes/activity.class';
import { ActivityListResponse } from '@shared/models/classes/activity';
import { Category } from '@shared/models/classes/category/category.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { BookingService } from './booking.service';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';
import { environment } from 'environments/environment';
import { NewActivityFormDatas } from '@shared/models/classes/activity/new-activity-form-datas.class';
import { NewActivityInput } from '@shared/models/classes/activity/new-activity-input.class';
import { TokenService } from './token.service';
import { UpdateActivityInput } from '@shared/models/classes/activity/update-activity-input.class';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	activity!: Activity;
	activities!: ActivityListResponse;
	category!: Category;
	categories!: Category[];
	department!: Department;

	private newActivitySubject = new BehaviorSubject<boolean>(false);
	newActivity$ = this.newActivitySubject.asObservable();

	private readonly _BASE_URL = `${environment.apiUrl}/activity`;
	private currentId = 0;
	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
		private _bookingService: BookingService,
		private _tokenService: TokenService,
	) {}

	notifyNewActivity() {
		this.newActivitySubject.next(true);
	}

	getActivityList$(): Observable<ActivityListResponse> {
		return this._httpClient
			.get<ActivityListResponse>(`${this._BASE_URL}/all`)
			.pipe(
				map((activities: ActivityListResponse) => {
					return activities
						.filter(activity => activity.isVisible === true)
						.sort((a, b) => +b.id - +a.id);
				}),
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
	): Observable<ActivityListResponse> {
		return this._httpClient
			.get<ActivityListResponse>(`${this._BASE_URL}/all`)
			.pipe(
				map((activities: ActivityListResponse) =>
					activities
						.filter(activity => activity.profileId === userId)
						.reverse(),
				),
				map((activities: ActivityListResponse) =>
					limit > 0 ? activities.slice(0, limit) : activities,
				),
			);
	}

	getListOfActivitiesRegisteredByUser$(
		limit: number = -1,
		profileId: number,
	): Observable<Activity[]> {
		return this._bookingService.getBookingListByUser$(profileId).pipe(
			map((bookingList: BookingUserActivity[]) =>
				bookingList.map(booking => booking.activity as Activity).reverse(),
			),
			map((activityList: Activity[]) =>
				limit > 0 ? activityList.slice(0, limit) : activityList,
			),
		);
	}

	filteredActivityList$(name: string): Observable<ActivityListResponse> {
		return this.getActivityList$().pipe(
			map((activityList: ActivityListResponse) =>
				activityList.filter((activity: Activity) =>
					activity.name.toLowerCase().includes(name.toLowerCase()),
				),
			),
		);
	}

	filteredActivityListByCategory$(
		categoryId: number,
	): Observable<ActivityListResponse> {
		return this.getActivityList$().pipe(
			map((activityList: ActivityListResponse) =>
				activityList.filter((activity: Activity) => {
					return activity.category === categoryId;
				}),
			),
		);
	}

	filteredActivityListByDepartment$(
		department: Department,
	): Observable<ActivityListResponse> {
		return this.getActivityList$().pipe(
			map((activityList: ActivityListResponse) =>
				activityList.filter((activity: Activity) => {
					return Number(activity.departmentId) === department.id;
				}),
			),
		);
	}

	// postNewActivity$(newActivity: Activity): Observable<Activity> {
	// 	const activityToPost = {
	// 		...newActivity,
	// 		isVisible: true,
	// 	};

	// 	return this._httpClient.post<Activity>(this._BASE_URL, activityToPost).pipe(
	// 		tap((activity: Activity) => {
	// 			this._router.navigate([FullActivityRouteEnum.DETAILS, activity.id]);
	// 		}),
	// 		catchError(error => {
	// 			throw error;
	// 		}),
	// 	);
	// }

	postNewActivity$(newActivity: NewActivityFormDatas): Observable<Activity> {
		const connectedUserId =
			this._tokenService.getTokenFromLocalStorageAndDecode()?.id;

		const activityRequestBody: NewActivityInput = new NewActivityInput(
			newActivity.name,
			newActivity.date,
			newActivity.age,
			newActivity.imgUrl,
			newActivity.link,
			newActivity.description,
			newActivity.nbGuest,
			true,
		);

		return this._httpClient
			.post<Activity>(
				`${this._BASE_URL}/add/region/${newActivity.region}/department/${newActivity.department}/city/${newActivity.city}/profile/${connectedUserId}/category/${newActivity.category}`,
				activityRequestBody,
			)
			.pipe(
				tap((activity: Activity) => {
					this._router.navigate([FullActivityRouteEnum.DETAILS, activity.id]);
					this.notifyNewActivity();
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

	getVisibleActivities(): Observable<ActivityListResponse> {
		return this._httpClient
			.get<ActivityListResponse>(this._BASE_URL)
			.pipe(
				map((activities: ActivityListResponse) =>
					activities.filter(activity => activity.isVisible),
				),
			);
	}

	updateActivity$(id: number, updatedData: any): Observable<Activity> {
		const activityRequestBody: UpdateActivityInput = new UpdateActivityInput(
			updatedData.name,
			updatedData.date,
			updatedData.age,
			updatedData.imgUrl,
			updatedData.link,
			updatedData.description,
			updatedData.nbGuest,
			true,
		);

		return this._httpClient
			.put<Activity>(`${this._BASE_URL}/update/${id}`, activityRequestBody)
			.pipe(
				catchError(error => {
					throw error;
				}),
			);
	}

	countBookings(activityId: number): Observable<number> {
		return this._httpClient.get<number>(
			`${this._BASE_URL}/${activityId}/countBookings`,
		);
	}
}
