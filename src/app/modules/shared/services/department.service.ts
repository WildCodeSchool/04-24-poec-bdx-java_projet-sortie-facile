import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from '@shared/models/classes/department.class';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DepartmentService {
	private readonly _BASE_URL = 'http://localhost:3000/departments';
	constructor(private _httpClient: HttpClient) {}

	getDepartmentsList$(): Observable<Department[]> {
		return this._httpClient.get<Department[]>(this._BASE_URL);
	}
}
