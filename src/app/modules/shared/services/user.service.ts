import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProfileInput } from '@shared/models/classes/user-details/new-profil-input.class';
import { UserGeneralForm } from '@shared/models/classes/user-details/user-details-general-form.class';
import { UserDetailsPatch } from '@shared/models/classes/user-details/user-details-patch.class';
import { UserDetailsPersonalInfosForm } from '@shared/models/classes/user-details/user-details-personal-info-form.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly _BASE_URL = `${environment.apiUrl}/profile`;

	constructor(private _httpClient: HttpClient) {}

	getUserInfos$(userId: string): Observable<UserDetails> {
		return this._httpClient.get<UserDetails>(`${this._BASE_URL}/${userId}`);
	}

	postUserInfos$(
		userInfos: NewProfileInput,
		regionId: number,
		departmentId: number,
		cityId: number,
		userId: number,
	): Observable<UserDetails> {
		return this._httpClient.post<UserDetails>(
			`${this._BASE_URL}/add/region/${regionId}/department/${departmentId}/city/${cityId}/user/${userId}`,
			userInfos,
		);
	}

	putUserInfo$(
		UserId: string,
		userInfos: UserDetailsPersonalInfosForm | UserGeneralForm,
	): Observable<UserDetails> {
		return this._httpClient.put<UserDetails>(
			`${this._BASE_URL}/${UserId}`,
			userInfos,
		);
	}

	patchUserInfo$(
		authUserConnectedId: string,
		newUsersDatas: UserDetailsPatch,
	): Observable<UserDetails> {
		return this._httpClient.patch<UserDetails>(
			`${this._BASE_URL}/${authUserConnectedId}`,
			newUsersDatas,
		);
	}
}
