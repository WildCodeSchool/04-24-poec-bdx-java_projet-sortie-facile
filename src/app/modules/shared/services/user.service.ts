import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUserUserDetailsFormDatas } from '@shared/models/classes/user-details/new-user-details-form-datas.class';
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

	postUserInfos$(userInfos: any): Observable<UserDetails> {
		const cloneUserInfos = { ...userInfos };
		delete cloneUserInfos.region;
		delete cloneUserInfos.city;
		delete cloneUserInfos.department;

		return this._httpClient.post<UserDetails>(
			`${this._BASE_URL}/add/region/${userInfos.region}/department/${userInfos.department}/city/${userInfos.city}`,
			{ ...cloneUserInfos, categoryIds: [1, 2], bookingIds: [1], userId: 1 },
		);
	}

	putUserInfo$(
		UserId: string,
		userInfos: UserDetailsPersonalInfosForm,
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
