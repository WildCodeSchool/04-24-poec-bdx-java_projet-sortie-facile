import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Activities } from '@models/types/activities.type';
import { Category } from '@models/types/category.type';
import { Router } from '@angular/router';
import { Department } from '@shared/models/classes/department.class';
import { Activity } from '@activity/models/classes/activity.class';
import { ConfirmationService } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	activity!: Activity;
	activities!: Activity[];
	category!: Category;
	categories!: Category[];
	department!: Department;

	private readonly _BASE_URL = 'http://localhost:3000/activity';

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
	) {}

	getActivityList$(): Observable<Activity[]> {
		return this._httpClient.get<Activity[]>(this._BASE_URL).pipe(
			map(activities =>
				activities.filter(activity => activity.isVisible === true),
			),
			catchError(error => {
				throw error;
			}),
		);
	}
	getActivityById$(id: string): Observable<Activity> {
		return this._httpClient
			.get<Activity>(`${this._BASE_URL}/${id}`)
			.pipe(map((response: Activity) => response));
	}
	//  ajouter parametre id + filtre au niveau du map userid = userid
	getActivityListByCreatedUser$(
		limit: number = -1,
		id: string,
	): Observable<Activities> {
		return this._httpClient.get<Activity[]>(this._BASE_URL).pipe(
			map((activities: Activity[]) => {
				// Filter activities by user ID
				const filteredActivities = activities.filter(
					activity => activity.userId === id,
				);
				// Apply limit if greater than 0
				return limit > 0
					? filteredActivities.slice(0, limit)
					: filteredActivities;
			}),
		);
	}
	filteredActivityList$(name: string): Observable<Activity[]> {
		return this.getActivityList$().pipe(
			map((activityList: Activity[]) =>
				activityList.filter((activity: Activity) =>
					activity.name.toLowerCase().includes(name.toLowerCase()),
				),
			),
		);
	}
	filteredActivityListByCategory$(
		categoryId: Category,
	): Observable<Activity[]> {
		return this.getActivityList$().pipe(
			map((activityList: Activity[]) =>
				activityList.filter((activity: Activity) => {
					return activity.categoryId.id === categoryId.id;
				}),
			),
		);
	}

	filteredActivityListByDepartment$(
		department: Department,
	): Observable<Activity[]> {
		return this.getActivityList$().pipe(
			map((activityList: Activity[]) =>
				activityList.filter((activity: Activity) => {
					return activity.department === department.id;
				}),
			),
		);
	}

	postNewActivity$(newActivity: Activity): Observable<Activity> {
		const activityToPost = {
			...newActivity,
			isVisible: true, // Assurez-vous que isVisible est bien initialisé à true
		};

		return this._httpClient.post<Activity>(this._BASE_URL, activityToPost).pipe(
			tap(activity => {
				this._router.navigate(['/activity/details', activity.id]);
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
		activityId: string,
		isVisible: boolean,
	): Observable<Activity> {
		return this._httpClient.patch<Activity>(`${this._BASE_URL}/${activityId}`, {
			isVisible,
		});
	}

	getVisibleActivities(): Observable<Activity[]> {
		return this._httpClient
			.get<Activity[]>(this._BASE_URL)
			.pipe(
				map(activities => activities.filter(activity => activity.isVisible)),
			);
	}
	updateActivity$(
		id: string,
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
