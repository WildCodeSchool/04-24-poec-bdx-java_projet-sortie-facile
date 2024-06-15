import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Region } from '@shared/models/classes/address/region.class';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RegionService {
	private readonly _BASE_URL = `${environment.apiUrl}/region`;

	constructor(private _httpClient: HttpClient) {}

	getRegionList$(): Observable<Region[]> {
		return this._httpClient
			.get<Region[]>(`${this._BASE_URL}/all`)
			.pipe(map((response: Region[]) => response));
	}

	getRegionById$(regionId: number): Observable<Region> {
		return this._httpClient
			.get<Region>(`${this._BASE_URL}/${regionId}`)
			.pipe(map((response: Region) => response));
	}
}
