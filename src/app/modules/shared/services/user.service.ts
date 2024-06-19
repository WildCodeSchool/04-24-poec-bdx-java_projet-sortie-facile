import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProfileInput } from '@shared/models/classes/user-details/new-profil-input.class';
import { UserGeneralForm } from '@shared/models/classes/user-details/user-details-general-form.class';
import { UserProfilePatch } from '@shared/models/classes/user-details/user-details-patch.class';
import { UserProfilePersonalInfosForm } from '@shared/models/classes/user-details/user-details-personal-info-form.class';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly _BASE_URL = `${environment.apiUrl}/profile`;

	constructor(private _httpClient: HttpClient) {}

	getUserInfos$(userId: number): Observable<UserProfile> {
		return this._httpClient.get<UserProfile>(`${this._BASE_URL}/${userId}`);
	}

	postUserInfos$(
		userInfos: NewProfileInput,
		regionId: number,
		departmentId: number,
		cityId: number,
		userId: number,
	): Observable<UserProfile> {
		return this._httpClient.post<UserProfile>(
			`${this._BASE_URL}/add/region/${regionId}/department/${departmentId}/city/${cityId}/user/${userId}`,
			userInfos,
		);
	}

	putUserInfo$(
		userId: number,
		userInfos: UserProfilePersonalInfosForm | UserGeneralForm,
	): Observable<UserProfile> {
		return this._httpClient.put<UserProfile>(
			`${this._BASE_URL}/${userId}`,
			userInfos,
		);
	}

	patchUserInfo$(
		authUserConnectedId: number,
		newUsersDatas: UserProfilePatch,
	): Observable<UserProfile> {
		return this._httpClient.patch<UserProfile>(
			`${this._BASE_URL}/${authUserConnectedId}`,
			newUsersDatas,
		);
	}
}
