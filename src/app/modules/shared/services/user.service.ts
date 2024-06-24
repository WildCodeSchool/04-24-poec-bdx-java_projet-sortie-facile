import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewProfileInput } from '@shared/models/classes/user-details/new-profil-input.class';
import { UpdateUserProfileInput } from '@shared/models/classes/user-details/update-user-profile-input.class';
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

	// putUserInfo$(
	// 	userId: number,
	// 	userInfos: UserProfilePersonalInfosForm | UserGeneralForm,
	// ): Observable<UserProfile> {
	// 	return this._httpClient.put<UserProfile>(
	// 		`${this._BASE_URL}/${userId}`,
	// 		userInfos,
	// 	);
	// }

	putUserInfo$(userId: number, userInfos: any): Observable<any> {
		const profileRequestBody: UpdateUserProfileInput =
			new UpdateUserProfileInput(
				userInfos.firstname,
				userInfos.lastname,
				userInfos.streetNumber,
				userInfos.street,
				userInfos.postalCode,
				userInfos.description,
				userInfos.avatar,
				userInfos.phone,
				userInfos.dateOfBirth,
			);

		return this._httpClient.put<any>(
			`${this._BASE_URL}/update/${userId}`,
			profileRequestBody,
		);
	}

	putUserCategories$(userId: number, categoryIds: number[]): Observable<any> {
		return this._httpClient.put<any>(
			`${this._BASE_URL}/update/${userId}/categories`,
			{
				categoryIds,
			},
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
