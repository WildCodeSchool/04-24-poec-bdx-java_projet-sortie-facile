import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
	UserAuth,
	UserAuthPatch,
	UserAuthPrimaryDatas,
	UserListResponseApi,
} from '@shared/models/types/user-list-response-api.type';
import {
	newUser,
	newUserDatas,
	newUserFormDatas,
} from '@shared/models/types/newUser.model';
import { AccountStatus } from '@shared/models/enums/user-role.enum';
import { AuthProvider } from '@shared/models/types/provider.type';
import { AuthProviderNameEnum } from '@shared/models/enums/auth-provider';

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

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
	) {}

	loginWithEmailAndPassword(
		username: string,
		password: string,
	): Observable<UserAuthPrimaryDatas> {
		return this._httpClient
			.get<UserListResponseApi>('http://localhost:3000/user')
			.pipe(
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
					this._redirectUser();
				}),
			);
	}

	createUserWithEmailAndPassword(
		newUser: newUserFormDatas,
	): Observable<newUserDatas> {
		return this._httpClient
			.post<newUser>('http://localhost:3000/user', newUser)
			.pipe(
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
					this._redirectUser();
				}),
			);
	}

	public patchConnectedUser(
		userAuthInfoPatch: UserAuthPatch,
	): Observable<UserAuth> {
		return this._httpClient
			.patch<UserAuth>(
				`http://localhost:3000/user/${this._userConnected.id}`,
				userAuthInfoPatch,
			)
			.pipe(
				tap((user: UserAuth) => {
					localStorage.setItem('user', JSON.stringify(user));
					this.setConnectedUserData(user);
				}),
			);
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

	private _redirectUser(): void {
		this._router.navigateByUrl('/user/home');
	}

	public deleteConnectedUser(): Observable<UserAuth> {
		this._userConnected.status = AccountStatus.INACTIVE;
		return this._httpClient.patch<UserAuth>(
			'http://localhost:3000/user/',
			this._userConnected,
		);
	}

	public increaseId(): Observable<string> {
		return this._httpClient.get<newUser[]>('http://localhost:3000/user').pipe(
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
}
