import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '@shared/models/classes/address/department.class';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	private readonly _BASE_URL = `${environment.apiUrlJsonServer}/department`;

	constructor(private _httpClient: HttpClient) {}

	getDepartmentsList$(): Observable<Department[]> {
		return this._httpClient
			.get<Department[]>(this._BASE_URL)
			.pipe(map((response: Department[]) => response));
	}
}
