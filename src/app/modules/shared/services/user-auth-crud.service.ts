import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	EMPTY,
	Observable,
	catchError,
	filter,
	map,
	switchMap,
	tap,
} from 'rxjs';
import { AuthUser } from '@shared/models/classes/auth-user/auth-user.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthUserPatch } from '@shared/models/classes/auth-user/auth-user-patch.class';
import { AuthUserListResponseApi } from '@shared/models/classes/auth-user';
import { AuthUserServiceUtils } from '@shared/models/classes/utils/auth-user-service-utils.class';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';

@Injectable({
	providedIn: 'root',
})
export class UserAuthCrudService extends AuthUserServiceUtils {
	constructor(private _httpClient: HttpClient) {
		super();
	}

	public updatePassword(
		connectedUser: AuthUserResponse,
		oldPassword: string,
		newPassword: string,
	): Observable<AuthUserPrimaryDatas> {
		return this._httpClient.get<AuthUserListResponseApi>(this.BASE_URL).pipe(
			map((users: AuthUserListResponseApi) => {
				return (
					users.find((user: AuthUser) => {
						return (
							user.username === connectedUser.nickname &&
							user.password === oldPassword
						);
					}) || null
				);
			}),
			filter((user: AuthUser | null) => user !== null),
			switchMap(() =>
				this.patchConnectedUser(
					{
						password: newPassword,
					},
					connectedUser,
				),
			),
			catchError(() => {
				return EMPTY;
			}),
		);
	}

	public patchConnectedUser(
		userAuthInfoPatch: AuthUserPatch,
		connectedUser: AuthUserResponse,
	): Observable<AuthUser> {
		return this._httpClient
			.patch<AuthUser>(
				`${this.BASE_URL}/${connectedUser.id}`,
				userAuthInfoPatch,
			)
			.pipe(
				tap((user: AuthUser) => {
					const currentUser = JSON.parse(
						localStorage.getItem('user') as string,
					);
					localStorage.setItem(
						'user',
						JSON.stringify({
							...user,
							UserProfileId: currentUser.UserProfileId,
						}),
					);
					this.setConnectedUserData({
						...user,
						UserProfileId: currentUser.UserProfileId,
					});
				}),
			);
	}
}
