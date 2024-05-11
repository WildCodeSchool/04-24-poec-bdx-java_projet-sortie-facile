import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from '@shared/models/types/user-details.type';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private _httpClient: HttpClient) {}

	getUserInfos$(authUserConnectedId: string): Observable<UserDetails> {
		return this._httpClient.get<UserDetails>(
			`http://localhost:3000/user_details/${authUserConnectedId}`,
		);
	}
}
