import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
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
			map((user: UserAuthPrimaryDatas) => ({
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
				status: user.status,
			})),
			tap((user: UserAuthPrimaryDatas) => {
				this.setConnectedUserData(user);
				this.notifyLoggedInStatus(true);
				this._router.navigateByUrl('/user/home');
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
			}),

			switchMap((newUser: newUserDatas) =>
				this._userService.postUserInfos$({
					...newUserPersonalInfos,
					userId: newUser.id,
				}),
			),
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
					localStorage.setItem('user', JSON.stringify(user));
					this.setConnectedUserData(user);
				}),
			);
	}

	public logout(): void {
		localStorage.removeItem('user');
		this.notifyLoggedInStatus(false);
		this._router.navigateByUrl('/auth/login');
	}

	public getConnectedUserData(): UserAuthPrimaryDatas {
		return this._userConnected;
	}

	public setConnectedUserData(user: UserAuthPrimaryDatas): void {
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
}
