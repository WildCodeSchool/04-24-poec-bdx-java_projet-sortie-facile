import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { TokenResponse } from '@shared/models/classes/token/token-response.class';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	private readonly _tokenDetailsSubject$: BehaviorSubject<AuthUserResponse | null> =
		new BehaviorSubject<AuthUserResponse | null>(
			this.getTokenFromLocalStorageAndDecode(),
		);

	protected _isLoggedInSubject: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);

	constructor(private _localStorageService: LocalStorageService) {}

	updateToken(token: TokenResponse) {
		this._clearLocalStorageAndThenPutNewToken(token);
		const decodedToken = this._decodeToken(token);
		this._setTokenDetailsSubject$(decodedToken);
	}

	getTokenFromLocalStorageAndDecode(): AuthUserResponse | null {
		const token: string | null = this._localStorageService.getToken();

		if (token) {
			return this._decodeToken({ token: token });
		} else {
			return null;
		}
	}

	resetToken(): void {
		this._tokenDetailsSubject$.next(null);
	}

	private _clearLocalStorageAndThenPutNewToken(
		tokenFromDB: TokenResponse,
	): void {
		this._localStorageService.clearToken();
		this._localStorageService.setToken(tokenFromDB);
	}

	private _decodeToken(tokenFromDB: TokenResponse): AuthUserResponse {
		return this._getDecodedTokenResponse(tokenFromDB.token);
	}

	private _getDecodedTokenResponse(token: string): AuthUserResponse {
		return jwtDecode(token);
	}

	private _setTokenDetailsSubject$(tokenInfos: AuthUserResponse): void {
		this._tokenDetailsSubject$.next(tokenInfos);
	}

	_getTokenDetailsSubject$(): Observable<AuthUserResponse> {
		return this._tokenDetailsSubject$.asObservable() as Observable<AuthUserResponse>;
	}

	public isLoggedIn(): Observable<boolean> {
		return this._isLoggedInSubject.asObservable();
	}

	public notifyLoggedInStatus(status: boolean): void {
		this._isLoggedInSubject.next(status);
	}
}
