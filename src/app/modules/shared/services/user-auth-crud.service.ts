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
import {
	UserAuth,
	UserAuthPatch,
	UserAuthPrimaryDatas,
	UserListResponseApi,
} from '@shared/models/types/user-list-response-api.type';
import { AuthUserServiceUtils } from '../models/classes/auth-user-service-utils.class';

@Injectable({
	providedIn: 'root',
})
export class UserAuthCrudService extends AuthUserServiceUtils {
	constructor(private _httpClient: HttpClient) {
		super();
	}

	public updatePassword(
		connectedUser: UserAuthPrimaryDatas,
		oldPassword: string,
		newPassword: string,
	): Observable<UserAuthPrimaryDatas> {
		return this._httpClient.get<UserListResponseApi>(this.BASE_URL).pipe(
			map((users: UserListResponseApi) => {
				return (
					users.find((user: UserAuth) => {
						return (
							user.username === connectedUser.username &&
							user.password === oldPassword
						);
					}) || null
				);
			}),
			filter((user: UserAuth | null) => user !== null),
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
		userAuthInfoPatch: UserAuthPatch,
		connectedUser: UserAuthPrimaryDatas,
	): Observable<UserAuth> {
		return this._httpClient
			.patch<UserAuth>(
				`${this.BASE_URL}/${connectedUser.id}`,
				userAuthInfoPatch,
			)
			.pipe(
				tap((user: UserAuth) => {
					const currentUser = JSON.parse(
						localStorage.getItem('user') as string,
					);
					localStorage.setItem(
						'user',
						JSON.stringify({
							...user,
							userDetailsId: currentUser.userDetailsId,
						}),
					);
					this.setConnectedUserData({
						...user,
						userDetailsId: currentUser.userDetailsId,
					});
				}),
			);
	}
}
