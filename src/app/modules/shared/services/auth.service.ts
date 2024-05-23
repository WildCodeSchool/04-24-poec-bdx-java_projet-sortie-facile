import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap, tap, throwError } from 'rxjs';
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
import { FormErrorMessageService } from './form-errors.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends AuthUserServiceUtils {
	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
		private _userService: UserService,
		private _formErrorMessage: FormErrorMessageService,
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
			map((user: UserAuth) => {
				if (!user) {
					throw new Error(this._formErrorMessage.loginErrorMessage);
				}
				return {
					id: user.id,
					username: user.username,
					email: user.email,
					role: user.role,
					status: user.status,
					userDetailsId: '',
				} as UserAuthPrimaryDatas;
			}),
			tap((user: UserAuthPrimaryDatas) => {
				localStorage.setItem('user', JSON.stringify(user));
				this.setConnectedUserData(user);
				this.notifyLoggedInStatus(true);
				this._router.navigateByUrl('/user/home');
			}),
			catchError(() => {
				return throwError(
					() =>
						new Error(
							"Votre nom d'utilisateur ou votre mot de passe incorrect",
						),
				);
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
