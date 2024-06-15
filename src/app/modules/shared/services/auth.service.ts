import {
	HttpClient,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NewAuthUser } from '@shared/models/classes/auth-user/new-auth-user.class';
import { UserService } from './user.service';
import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';
import { NewAuthUserFormDatas } from '@shared/models/classes/auth-user/new-auth-user-form-datas.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { NewUserUserDetailsFormDatas } from '@shared/models/classes/user-details/new-user-details-form-datas.class';
import { AuthUser } from '@shared/models/classes/auth-user/auth-user.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthUserServiceUtils } from '@shared/models/classes/utils/auth-user-service-utils.class';
import {
	FullAuthenticationRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { TokenService } from './token.service';
import { AuthUserCredentials } from '@shared/models/classes/auth-user/auth-user-credentials.class';
import { TokenResponse } from '@shared/models/classes/token/token-response.class';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends AuthUserServiceUtils {
	private readonly _BASE_URL = 'http://localhost:8080/api/v1/auth';

	private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> =
		new BehaviorSubject(new HttpErrorResponse({}));

	private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> =
		new BehaviorSubject(new HttpResponse({}));

	constructor(
		private _httpClient: HttpClient,
		private _tokenService: TokenService,
		private _router: Router,
		private _userService: UserService,
		// private _formErrorMessage: FormErrorMessageService,
	) {
		super();
	}

	loginWithEmailAndPassword(userCredentials: AuthUserCredentials): void {
		this._tokenService.resetToken();
		this._httpClient
			.post<TokenResponse>(`${this._BASE_URL}/authenticate`, userCredentials)
			.subscribe((token: TokenResponse) => {
				this._tokenService.updateToken(token);
			});
		// return this._httpClient.get<AuthUserListResponseApi>(this.BASE_URL).pipe(
		// 	map(
		// 		(users: AuthUserListResponseApi) =>
		// 			this.findUserByUsernameAndPassword(
		// 				users,
		// 				username,
		// 				password,
		// 			) as AuthUser,
		// 	),
		// 	map((user: AuthUser) => {
		// 		if (!user) {
		// 			throw new Error(this._formErrorMessage.loginErrorMessage);
		// 		}
		// 		return {
		// 			id: user.id,
		// 			username: user.username,
		// 			email: user.email,
		// 			role: user.role,
		// 			status: user.status,
		// 			userDetailsId: user.userDetailsId,
		// 		} as AuthUserPrimaryDatas;
		// 	}),
		// 	tap((user: AuthUserPrimaryDatas) => {
		// 		localStorage.setItem('user', JSON.stringify(user));
		// 		this.setConnectedUserData(user);
		// 		this.notifyLoggedInStatus(true);
		// 		this._router.navigateByUrl(FullUserRouteEnum.HOME);
		// 	}),
		// 	catchError(() => {
		// 		return throwError(
		// 			() =>
		// 				new Error(
		// 					"Votre nom d'utilisateur ou votre mot de passe incorrect",
		// 				),
		// 		);
		// 	}),
		// );
	}

	createUserWithEmailAndPassword(
		newUserAuthInfos: NewAuthUserFormDatas,
		newUserPersonalInfos: NewUserUserDetailsFormDatas,
	): Observable<NewAuthUser> {
		return this._httpClient
			.post<NewAuthUser>(`${this.BASE_URL}`, newUserAuthInfos)
			.pipe(
				switchMap((createdUser: NewAuthUser) => {
					return this._userService
						.postUserInfos$({
							...newUserPersonalInfos,
							userId: createdUser.id,
						})
						.pipe(
							map((createdUserInfo: UserDetails) => {
								return {
									...createdUser,
									userDetailsId: createdUserInfo.id,
								};
							}),
						);
				}),
				switchMap((updatedUser: NewAuthUser) =>
					this._httpClient.put<NewAuthUser>(
						`${this.BASE_URL}/${updatedUser.id}`,
						updatedUser,
					),
				),
				map((finalUser: NewAuthUser) => {
					const userToStore = this.getAuthUserFormatted(finalUser);

					localStorage.setItem('user', JSON.stringify(userToStore));
					this.setConnectedUserData(userToStore);
					this.notifyLoggedInStatus(true);
					return finalUser;
				}),
				tap(() => {
					this._router.navigateByUrl(FullUserRouteEnum.HOME);
				}),
			);
	}

	public logout(): void {
		localStorage.removeItem('user');
		this.setConnectedUserData({
			id: '',
			username: '',
			email: '',
			role: UserRoleEnum.USER,
			status: AccountStatus.ACTIVE,
			userDetailsId: '',
		});
		this.notifyLoggedInStatus(false);
		this._router.navigateByUrl(FullAuthenticationRouteEnum.LOGIN);
	}

	public deleteConnectedUser(): Observable<AuthUser> {
		this._userConnected.status = AccountStatus.INACTIVE;
		return this._httpClient.patch<AuthUser>(this.BASE_URL, this._userConnected);
	}

	public increaseId(): Observable<string> {
		return this._httpClient.get<NewAuthUser[]>(this.BASE_URL).pipe(
			map((users: NewAuthUser[]) => {
				const lastId = users[users.length - 1].id;
				return (Number(lastId) + 1).toString();
			}),
		);
	}

	public deleteUser(userId: string): Observable<AuthUserPrimaryDatas> {
		return this._httpClient
			.patch<AuthUserPrimaryDatas>(`${this.BASE_URL}/${userId}`, {
				email: '',
				password: '',
				username: '',
				status: AccountStatus.INACTIVE,
				userDetailsId: '',
			})
			.pipe(tap(() => this.logout()));
	}

	getHttpErrorSubject$(): Observable<HttpErrorResponse> {
		return this._httpErrorSubject$.asObservable();
	}

	setHttpErrorSubject$(error: HttpErrorResponse): void {
		this._httpSuccessSubject$.next(new HttpResponse({}));
		this._httpErrorSubject$.next(error);
	}

	getHttpSuccessSubject$(): Observable<HttpResponse<any>> {
		return this._httpSuccessSubject$.asObservable();
	}

	setHttpSuccessSubject$(success: HttpResponse<any>): void {
		this._httpErrorSubject$.next(new HttpErrorResponse({}));
		this._httpSuccessSubject$.next(success);
	}
}
