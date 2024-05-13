import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
	UserAuth,
	UserAuthPrimaryDatas,
	UserListResponseApi,
} from '@shared/models/types/user-list-response-api.type';
// import { newUser } from '@shared/models/types/newUser.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _userConnected!: UserAuthPrimaryDatas;

	constructor(
		private _httpClient: HttpClient,
		private _router: Router,
	) {}

	// createUserWithEmailAndPassword(userCredentials: newUser): void {
	//   console.log('created ok');
	//   this.httpClient.post('http://localhost:3000/user', userCredentials).subscribe();
	// }
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
				})),
				tap((user: UserAuthPrimaryDatas) => {
					this.setConnectedUserData(user);
					this._redirectUser();
				}),
			);
	}

	// createUserWithEmailAndPassword(userCredentials: any): void {
	// 	console.log('created ok');
	// }

	public getConnectedUserData(): UserAuthPrimaryDatas {
		return this._userConnected;
	}

	public setConnectedUserData(user: UserAuthPrimaryDatas): void {
		this._userConnected = user;
	}

	private _redirectUser(): void {
		this._router.navigateByUrl('/user/home');
	}
}
