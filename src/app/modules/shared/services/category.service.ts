import { Activity } from '@activity/models/classes/activity.class';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@shared/models/classes/category.class';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	activity!: Activity;
	activities!: Activity;
	category!: Category;
	categories!: Category[];

	private readonly _BASE_URL = 'http://localhost:3000/activity';

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
	) {}
	getCategoryList$(): Observable<Category[]> {
		return this._httpClient
			.get<Category[]>(`http://localhost:3000/category`)
			.pipe(map((response: Category[]) => response));
	}

	getCategoryById$(id: number): Observable<string> {
		return this._httpClient
			.get<Activity[]>(`${this._BASE_URL}?categoryId=${id}`)
			.pipe(
				map((activities: Activity[]) =>
					activities.map(activity => activity.name).join(', '),
				),
			);
	}
	getCategoryTitle$(categoryId: string): Observable<string> {
		return this._httpClient
			.get<Category>(`http://localhost:3000/category/${categoryId}`)
			.pipe(
				map((category: Category) => {
					return category.title;
				}),
			);
	}

	getActivityListByCategoryId$(id: number): Observable<Activity[]> {
		return this._httpClient.get<Activity[]>(
			`${this._BASE_URL}?categoryId=${id}`,
		);
	}
}
