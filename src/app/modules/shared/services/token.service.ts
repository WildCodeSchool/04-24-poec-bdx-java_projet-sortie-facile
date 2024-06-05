import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenResponse } from '@shared/models/classes/token/token.class';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	private readonly _tokenDetailsSubject$: BehaviorSubject<any> =
		new BehaviorSubject<any>(this.getTokenFromLocalStorageAndDecode());

	constructor(private _localStorageService: LocalStorageService) {}

	updateToken(token: TokenResponse) {
		this._clearLocalStorageAndThenPutNewToken(token);
		const decodedToken = this._decodeToken(token);
		this._setTokenDetailsSubject$(decodedToken);
	}

	getTokenFromLocalStorageAndDecode(): any {
		const token = this._localStorageService.getToken();
		if (token) {
			return this._decodeToken({ token: token });
		} else {
			return null;
		}
	}

	resetToken(): void {
		this._tokenDetailsSubject$.next({});
	}

	private _clearLocalStorageAndThenPutNewToken(
		tokenFromDB: TokenResponse,
	): void {
		this._localStorageService.clearToken();
		this._localStorageService.setToken(tokenFromDB);
	}

	private _decodeToken(tokenFromDB: TokenResponse): any {
		return this._getDecodedTokenResponse(tokenFromDB.token);
	}

	private _getDecodedTokenResponse(token: string): any {
		return jwtDecode(token);
	}

	private _setTokenDetailsSubject$(tokenInfos: any): void {
		this._tokenDetailsSubject$.next(tokenInfos);
	}

	_getTokenDetailsSubject$(): Observable<any> {
		return this._tokenDetailsSubject$.asObservable();
	}
}
