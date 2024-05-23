import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	EMPTY,
	Observable,
	catchError,
	filter,
	map,
	switchMap,
	tap,
	throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import {
	UserAuth,
	UserAuthPatch,
	UserAuthPrimaryDatas,
	UserListResponseApi,
} from '@shared/models/types/user-list-response-api.type';
import { newUser, newUserDatas } from '@shared/models/types/newUser.model';
import { AccountStatus } from '@shared/models/enums/user-role.enum';
import { AuthProvider } from '@shared/models/types/provider.type';
import { AuthProviderNameEnum } from '@shared/models/enums/auth-provider';
import { NewUserFormDatas } from '@shared/models/classes/new-user-form-datas.class';
import { UserService } from './user.service';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';
import { UserInfo } from '@shared/models/classes/user-infos.type';
import { FormErrorMessageService } from './form-errors.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _userConnected!: UserAuthPrimaryDatas;
	private _isLoggedInSubject: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);

	private _providerNameList: AuthProvider[] = [
		{ name: AuthProviderNameEnum.GOOGLE },
		{ name: AuthProviderNameEnum.FACEBOOK },
		{ name: AuthProviderNameEnum.TWITTER },
	];

	private BASE_URL: string = 'http://localhost:3000/user';

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
		private _userService: UserService,
		private _formErrorMessage: FormErrorMessageService,
	) {}

	loginWithEmailAndPassword(
		username: string,
		password: string,
	): Observable<UserAuthPrimaryDatas> {
		return this._httpClient.get<UserListResponseApi>(this.BASE_URL).pipe(
			map(
				(users: UserListResponseApi) =>
					users.find((user: UserAuth) => {
						return user.username === username && user.password === password;
					}) as UserAuth,
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
	): Observable<UserInfo> {
		return this._httpClient.post<newUser>(this.BASE_URL, newUserAuthInfos).pipe(
			map((user: newUser) => ({
				id: user.id,
				username: user.username,
				email: user.email,
				password: user.password,
				role: user.role,
				status: user.status,
			})),
			tap((user: newUserDatas) => {
				this.setConnectedUserData(user);
				this.notifyLoggedInStatus(true);
				localStorage.setItem('user', JSON.stringify(user));
			}),
			switchMap((newUser: newUserDatas) =>
				this._userService.postUserInfos$({
					...newUserPersonalInfos,
					userId: newUser.id,
				}),
			),
			tap(newUser => {
				const user = JSON.parse(localStorage.getItem('user') as string);
				localStorage.setItem(
					'user',
					JSON.stringify({ ...user, userDetailsId: newUser.id }),
				);

				this.setConnectedUserData({ ...user, userDetailsId: newUser.id });

				this._router.navigateByUrl('/user/home');
			}),
		);
	}

	public patchConnectedUser(
		userAuthInfoPatch: UserAuthPatch,
	): Observable<UserAuth> {
		return this._httpClient
			.patch<UserAuth>(
				`${this.BASE_URL}/${this._userConnected.id}`,
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

	public logout(): void {
		localStorage.removeItem('user');
		this.notifyLoggedInStatus(false);
		this._router.navigateByUrl('/auth/login');
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
				this.patchConnectedUser({
					password: newPassword,
				}),
			),
			catchError(() => {
				return EMPTY;
			}),
		);
	}

	public getConnectedUserData(): UserAuthPrimaryDatas {
		return this._userConnected;
	}

	public setConnectedUserData(user: any): void {
		this._userConnected = user;
	}

	public getProviderNameList(): AuthProvider[] {
		return this._providerNameList;
	}

	public deleteConnectedUser(): Observable<UserAuth> {
		this._userConnected.status = AccountStatus.INACTIVE;
		return this._httpClient.patch<UserAuth>(this.BASE_URL, this._userConnected);
	}

	public increaseId(): Observable<string> {
		return this._httpClient.get<newUser[]>(this.BASE_URL).pipe(
			map((users: newUser[]) => {
				const lastId = users[users.length - 1].id;
				return (Number(lastId) + 1).toString();
			}),
		);
	}

	public get isLoggedIn(): Observable<boolean> {
		return this._isLoggedInSubject.asObservable();
	}

	public notifyLoggedInStatus(status: boolean): void {
		this._isLoggedInSubject.next(status);
	}

	public checkIfUserIsConnectedAndNotifyLoggedInStatus(): void {
		if (localStorage.getItem('user')) {
			this.setConnectedUserData(
				JSON.parse(localStorage.getItem('user') as string),
			);

			this.notifyLoggedInStatus(true);
		}
	}

	public deleteUser(userId: string): Observable<UserAuthPrimaryDatas> {
		return this._httpClient
			.patch<UserAuthPrimaryDatas>(`${this.BASE_URL}/${userId}`, {
				email: '',
				password: '',
				username: '',
				status: AccountStatus.INACTIVE,
				userDetailsId: '',
			})
			.pipe(tap(() => this.logout()));
	}
}
