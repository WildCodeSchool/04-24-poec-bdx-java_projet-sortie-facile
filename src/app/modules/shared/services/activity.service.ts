import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Activities } from '@models/types/activities.type';
import { Category } from '@models/types/category.type';
import { Router } from '@angular/router';
import { Activity } from '@activity/models/classes/activity.class';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	activity!: Activity;
	activities!: Activity;
	category!: Category;
	categories!: Category[];

	private readonly _BASE_URL = 'http://localhost:3000/activity';

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
	) {}

	getActivityList$(): Observable<Activity[]> {
		return this._httpClient
			.get<Activities>(this._BASE_URL)
			.pipe(map((response: Activities) => response));
	}

	getActivityById$(id: number): Observable<Activity> {
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

	postNewActivity$(newActivity: Activity): Observable<Activity> {
		return this._httpClient.get<Activity[]>(this._BASE_URL).pipe(
			switchMap(activities => {
				const nextId =
					activities.length > 0
						? Number(activities[activities.length - 1].id) + 1
						: 1;
				newActivity.id = String(nextId);

				return this._httpClient
					.post<Activity>(this._BASE_URL, newActivity)
					.pipe(
						tap(activity => {
							this._router.navigate(['/activity/details', activity.id]);
						}),
					);
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
