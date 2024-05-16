/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '@models/types/activity.type';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { Activities } from '@models/types/activities.type';
import { Category } from '@models/types/category.type';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	activity!: Activity;
	activities!: Activity;
	category!: Category;
	categories!: Category[];

	private readonly _BASE_URL = 'http://localhost:3000/activity';

	constructor(private http: HttpClient) {}

	getActivityList$(): Observable<Activity[]> {
		return this.http
			.get<Activities>(this._BASE_URL)
			.pipe(map((response: Activities) => response));
	}

	getActivityById$(id: number): Observable<Activity> {
		return this.http
			.get<Activity>(`${this._BASE_URL}/${id}`)
			.pipe(map((response: Activity) => response));
	}

	getActivityListByCreatedUser$(limit: number = -1): Observable<Activity[]> {
		return this.http
			.get<Activities>(this._BASE_URL)
			.pipe(map((response: Activities) => response.slice(0, limit)));
	}

	getCategoryList$(): Observable<Category[]> {
		return this.http
			.get<Category[]>(`http://localhost:3000/category`)
			.pipe(map((response: Category[]) => response));
	}

	getCategoryById$(id: number): Observable<string> {
		return this.http
			.get<Activity[]>(`${this._BASE_URL}?categoryId=${id}`)
			.pipe(
				map((activities: Activity[]) =>
					activities.map(activity => activity.name).join(', '),
				),
			);
	}
	getCategoryTitle$(categoryId: string): Observable<string> {
		return this.http
			.get<Category>(`http://localhost:3000/category/${categoryId}`)
			.pipe(
				map((category: Category) => {
					return category.title;
				}),
			);
	}

	getActivityListByCategoryId$(id: number): Observable<Activity[]> {
		return this.http.get<Activity[]>(`${this._BASE_URL}?categoryId=${id}`);
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
		return this.http.get<Activity[]>(this._BASE_URL).pipe(
			switchMap(activities => {
				const nextId =
					activities.length > 0
						? Number(activities[activities.length - 1].id) + 1
						: 1;
				newActivity.id = String(nextId);

				return this.http.post<Activity>(this._BASE_URL, newActivity);
			}),

			catchError(error => {
				console.log('Error', error);
				throw error;
			}),
		);
	}

	deleteActivity$(id: string): Observable<unknown> {
		return this.http.delete(`${this._BASE_URL}/${id}`).pipe(
			catchError(error => {
				console.log('Error', error);
				throw error;
			}),
		);
	}

	updateActivity$(
		id: string,
		updatedData: Partial<Activity>,
	): Observable<unknown> {
		return this.http.patch(`${this._BASE_URL}/${id}`, updatedData).pipe(
			catchError(error => {
				console.log('Error', error);
				throw error;
			}),
		);
	}
}
