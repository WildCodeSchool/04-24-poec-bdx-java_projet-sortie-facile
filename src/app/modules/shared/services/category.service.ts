import { Activity } from '@activity/models/classes/activity.class';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@shared/models/classes/category/category.class';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	activity!: Activity;
	activities!: Activity;
	category!: Category;
	categories!: Category[];

	private readonly _BASE_URL = `${environment.apiUrlJsonServer}/category`;
	private readonly _ACTIVITY_URL = `${environment.apiUrlJsonServer}/activity`;

	constructor(private _httpClient: HttpClient) {}

	getCategoryList$(): Observable<Category[]> {
		return this._httpClient
			.get<Category[]>(this._BASE_URL)
			.pipe(map((response: Category[]) => response));
	}

	getCategoryById$(id: string): Observable<string> {
		return this._httpClient
			.get<Activity[]>(`${this._ACTIVITY_URL}?categoryId=${id}`)
			.pipe(
				map((activities: Activity[]) =>
					activities.map(activity => activity.name).join(', '),
				),
			);
	}
	getCategoryTitle$(categoryId: string): Observable<string> {
		return this._httpClient
			.get<Category>(`${this._BASE_URL}/${categoryId}`)
			.pipe(
				map((category: Category) => {
					return category.name;
				}),
			);
	}

	getActivityListByCategoryId$(id: string): Observable<Activity[]> {
		return this._httpClient.get<Activity[]>(
			`${this._ACTIVITY_URL}?categoryId=${id}`,
		);
	}
}
