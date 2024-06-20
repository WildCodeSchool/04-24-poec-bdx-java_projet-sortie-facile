import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@shared/models/classes/address/city.class';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CityService {
	private readonly _BASE_URL = `${environment.apiUrl}/city`;

	constructor(private _httpClient: HttpClient) {}

	getCityList$(): Observable<City[]> {
		return this._httpClient
			.get<City[]>(`${this._BASE_URL}/all`)
			.pipe(map((response: City[]) => response));
	}

	getCityById$(cityId: number): Observable<City> {
		return this._httpClient
			.get<City>(`${this._BASE_URL}/${cityId}`)
			.pipe(map((response: City) => response));
	}
}
