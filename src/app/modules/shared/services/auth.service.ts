import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NewAuthUser } from '@shared/models/classes/auth-user/new-auth-user.class';
import { UserService } from './user.service';
import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';
import { NewAuthUserFormDatas } from '@shared/models/classes/auth-user/new-auth-user-form-datas.class';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
import { NewUserUserProfileFormDatas } from '@shared/models/classes/user-details/new-user-details-form-datas.class';
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
import { environment } from 'environments/environment';
import { NewAuthUserInput } from '@shared/models/classes/auth-user/new-auth-user-input.class';
import { NewProfileInput } from '@shared/models/classes/user-details/new-profil-input.class';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends AuthUserServiceUtils {
	private readonly _BASE_URL = `${environment.apiUrl}/auth`;

	constructor(
		private _httpClient: HttpClient,
		private _tokenService: TokenService,
		private _router: Router,
		private _userService: UserService,
		private _localStorageService: LocalStorageService,
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
				this._authStatus.next(true);
				this._router.navigateByUrl(FullUserRouteEnum.HOME);
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
		// 			UserProfileId: user.UserProfileId,
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
		newUserPersonalInfos: NewUserUserProfileFormDatas,
	) {
		const userAuthRequestBody: NewAuthUserInput = new NewAuthUserInput(
			newUserAuthInfos.username,
			newUserAuthInfos.email,
			newUserAuthInfos.password,
			newUserAuthInfos.role,
		);

		return this._httpClient
			.post<NewAuthUser>(`${this._BASE_URL}/register`, userAuthRequestBody)
			.pipe(
				map(() => {
					return this._tokenService.getTokenFromLocalStorageAndDecode();
				}),
				switchMap((registerUser: AuthUserResponse | null) => {
					const newProfileRequestBody: NewProfileInput = new NewProfileInput(
						newUserPersonalInfos.firstname,
						newUserPersonalInfos.lastname,
						newUserPersonalInfos.streetNumber,
						newUserPersonalInfos.street,
						newUserPersonalInfos.postalCode,
						newUserPersonalInfos.description,
						newUserPersonalInfos.avatar,
						newUserPersonalInfos.phone,
						newUserPersonalInfos.dateOfBirth,
					);

					return this._userService.postUserInfos$(
						newProfileRequestBody,
						newUserPersonalInfos.city,
						newUserPersonalInfos.department,
						newUserPersonalInfos.city,
						Number(registerUser?.id),
					);
				}),
			);

		// return this._httpClient
		// 	.post<NewAuthUser>(`${this.BASE_URL}`, newUserAuthInfos)
		// 	.pipe(
		// 		switchMap((createdUser: NewAuthUser) => {
		// 			return this._userService
		// 				.postUserInfos$({
		// 					...newUserPersonalInfos,
		// 					userId: createdUser.id,
		// 				})
		// 				.pipe(
		// 					map((createdUserInfo: UserProfile) => {
		// 						return {
		// 							...createdUser,
		// 							UserProfileId: createdUserInfo.id,
		// 						};
		// 					}),
		// 				);
		// 		}),
		// 		switchMap((updatedUser: NewAuthUser) =>
		// 			this._httpClient.put<NewAuthUser>(
		// 				`${this.BASE_URL}/${updatedUser.id}`,
		// 				updatedUser,
		// 			),
		// 		),
		// 		map((finalUser: NewAuthUser) => {
		// 			const userToStore = this.getAuthUserFormatted(finalUser);

		// 			localStorage.setItem('user', JSON.stringify(userToStore));
		// 			this.setConnectedUserData(userToStore);
		// 			this.notifyLoggedInStatus(true);
		// 			return finalUser;
		// 		}),
		// 		tap(() => {
		// 			this._router.navigateByUrl(FullUserRouteEnum.HOME);
		// 		}),
		// 	);
	}

	public logout(): void {
		this._localStorageService.clearToken();
		this._tokenService.resetToken();
		this._authStatus.next(false);
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
				UserProfileId: '',
			})
			.pipe(tap(() => this.logout()));
	}

	getAuthStatus(): Observable<boolean> {
		return this._authStatus.asObservable();
	}
}
