import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
	UserAuth,
	UserAuthPrimaryDatas,
	UserListResponseApi,
} from '@shared/models/types/user-list-response-api.type';
import { newUser } from '@shared/models/types/newUser.model';
import { NewUserFormDatas } from '@shared/models/classes/new-user-form-datas.class';
import { UserService } from './user.service';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';
import { UserInfo } from '@shared/models/classes/user-infos.type';
import { AccountStatus } from '@shared/models/enums/user-role.enum';
import { AuthUserServiceUtils } from '@shared/models/classes/auth-user-service-utils.class';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends AuthUserServiceUtils {
	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
		private _userService: UserService,
	) {
		super();
	}

	loginWithEmailAndPassword(
		username: string,
		password: string,
	): Observable<UserAuthPrimaryDatas> {
		return this._httpClient.get<UserListResponseApi>(this.BASE_URL).pipe(
			map(
				(users: UserListResponseApi) =>
					this.findUserByUsernameAndPassword(
						users,
						username,
						password,
					) as UserAuth,
			),
			map((user: UserAuthPrimaryDatas) => this.getAuthUserFormatted(user)),
			tap((user: UserAuthPrimaryDatas) => {
				localStorage.setItem('user', JSON.stringify(user));
				this.setConnectedUserData(user);
				this.notifyLoggedInStatus(true);
				this._router.navigateByUrl('/user/home');
			}),
		);
	}

	createUserWithEmailAndPassword(
		newUserAuthInfos: NewUserFormDatas,
		newUserPersonalInfos: NewUserPersonalInfosFormDatas,
	): Observable<any> {
		return this._httpClient
			.post<newUser>(`${this.BASE_URL}`, newUserAuthInfos)
			.pipe(
				switchMap((createdUser: newUser) => {
					return this._userService
						.postUserInfos$({
							...newUserPersonalInfos,
							userId: createdUser.id,
						})
						.pipe(
							map((createdUserInfo: UserInfo) => {
								return {
									...createdUser,
									userDetailsId: createdUserInfo.id,
								};
							}),
						);
				}),
				switchMap((updatedUser: newUser) =>
					this._httpClient.put<newUser>(
						`${this.BASE_URL}/${updatedUser.id}`,
						updatedUser,
					),
				),
				map((finalUser: newUser) => {
					const userToStore = this.getAuthUserFormatted(finalUser);

					localStorage.setItem('user', JSON.stringify(userToStore));
					this.setConnectedUserData(userToStore);
					this.notifyLoggedInStatus(true);
					return finalUser;
				}),
				tap(() => {
					this._router.navigateByUrl('/user/home');
				}),
			);
	}

	public logout(): void {
		localStorage.removeItem('user');
		this.notifyLoggedInStatus(false);
		this._router.navigateByUrl('/auth/login');
	}

	public deleteConnectedUser(): Observable<UserAuth> {
		this._userConnected.status = AccountStatus.INACTIVE;
		return this._httpClient.patch<UserAuth>(this.BASE_URL, this._userConnected);
	}
}
