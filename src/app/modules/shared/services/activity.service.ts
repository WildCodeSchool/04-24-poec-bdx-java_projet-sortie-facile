/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity, ActivityCopy } from '@models/types/activity.type';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
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
		return this.http.get<Activity>(`${this._BASE_URL}/${id}`).pipe(
			tap(value => console.log(value)),
			map((response: Activity) => response),
		);
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
		return this.http.get<any>(`${this._BASE_URL}/${categoryId}`).pipe(
			map((category: any) => {
				// Supposons que le titre de la catégorie soit stocké dans une propriété "title"
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

	// finir filtre de laliste par cetegorie
	// filteredActivityListByCategoryId$(id: Number): Observable<Category[]> {
	//   return this.getActivityList$().pipe(
	//     map((activityList: activity[]) =>
	//       activityList.filter((category: Category) =>
	//         activity.category.toLowerCase().includes(categorie.toLowerCase())
	//       )
	//     )
	//   );
	// }
	postNewActivity$(newActivity: Activity): Observable<ActivityCopy> {
		return this.http.get<Activity[]>(this._BASE_URL).pipe(
			switchMap(activities => {
				const nextId =
					activities.length > 0
						? Number(activities[activities.length - 1].id) + 1
						: 1;
				newActivity.id = String(nextId);

				return this.http.post<ActivityCopy>(this._BASE_URL, newActivity);
			}),
			tap(data => {
				console.log('POST Request is successful ', data);
			}),
			catchError(error => {
				console.log('Error', error);
				throw error;
			}),
		);
	}

	deleteActivity$(id: string): Observable<unknown> {
		return this.http.delete(`${this._BASE_URL}/${id}`).pipe(
			tap(data => {
				console.log('Delete Request is successful ', data);
			}),
			catchError(error => {
				console.log('Error', error);
				throw error;
			}),
		);
	}

	// faire la page modofication d'activité
	updateActivity$(id: string, updatedData: any): Observable<unknown> {
		return this.http.patch(`${this._BASE_URL}/${id}`, updatedData).pipe(
			tap(data => {
				console.log('Update Request is successful ', data);
			}),
			catchError(error => {
				console.log('Error', error);
				throw error;
			}),
		);
	}
}
