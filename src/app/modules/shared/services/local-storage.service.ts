import { Injectable } from '@angular/core';
import { TokenResponse } from '@shared/models/classes/token/token.class';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	getToken(): string | null {
		const token = localStorage.getItem('token');
		if (token) {
			return token;
		} else {
			return null;
		}
	}

	setToken(tokenFromDatabase: TokenResponse): void {
		localStorage.setItem('token', tokenFromDatabase.token);
	}

	clearToken(): void {
		localStorage.removeItem('token');
	}
}
