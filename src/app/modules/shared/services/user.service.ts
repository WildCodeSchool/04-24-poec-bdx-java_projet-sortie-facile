import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';
import { UserInfo } from '@shared/models/classes/user-infos.type';
import {
	UserDetails,
	UserDetailsPatch,
	UserDetailsPersonalInfosForm,
} from '@shared/models/types/user-details.type';
import { Observable } from 'rxjs';
('ok');
@Injectable({
	providedIn: 'root',
})
export class UserService {
	private readonly _BASE_URL = 'http://localhost:3000/user_details';

	constructor(private _httpClient: HttpClient) {}

	getUserInfos$(userId: string): Observable<UserDetails> {
		return this._httpClient.get<UserDetails>(`${this._BASE_URL}/${userId}`);
	}

	postUserInfos$(
		userInfos: NewUserPersonalInfosFormDatas,
	): Observable<UserInfo> {
		return this._httpClient.post<UserInfo>(this._BASE_URL, userInfos);
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
