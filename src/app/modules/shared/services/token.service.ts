import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenResponse } from '@shared/models/classes/token/token.class';
import { LocalStorageService } from './local-storage.service';
import { AuthResponse } from '@shared/models/classes/auth-user/auth-response.class';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	private readonly _tokenDetailsSubject$: BehaviorSubject<AuthResponse | null> =
		new BehaviorSubject<AuthResponse | null>(
			this.getTokenFromLocalStorageAndDecode(),
		);

	constructor(private _localStorageService: LocalStorageService) {}

	updateToken(token: TokenResponse) {
		this._clearLocalStorageAndThenPutNewToken(token);
		const decodedToken = this._decodeToken(token);
		this._setTokenDetailsSubject$(decodedToken);
	}

	getTokenFromLocalStorageAndDecode(): AuthResponse | null {
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

	private _decodeToken(tokenFromDB: TokenResponse): AuthResponse {
		return this._getDecodedTokenResponse(tokenFromDB.token);
	}

	private _getDecodedTokenResponse(token: string): AuthResponse {
		return jwtDecode(token);
	}

	private _setTokenDetailsSubject$(tokenInfos: AuthResponse): void {
		this._tokenDetailsSubject$.next(tokenInfos);
	}

	_getTokenDetailsSubject$(): Observable<AuthResponse> {
		return this._tokenDetailsSubject$.asObservable() as Observable<AuthResponse>;
	}
}
