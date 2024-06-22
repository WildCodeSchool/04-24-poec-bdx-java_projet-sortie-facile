import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { FullUserRouteEnum } from '@shared/models/enums/routes/full-routes';
import { TokenService } from '@shared/services/token.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthPublicGuard implements CanActivate {
	connectedUser!: AuthUserResponse;

	constructor(
		private _router: Router,
		private _tokenService: TokenService,
	) {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: AuthUserResponse) => {
				this.connectedUser = connectedUser;
			});
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		if (!this.connectedUser) {
			return true;
		} else {
			this._router.navigate([FullUserRouteEnum.HOME]);
			return false;
		}
	}
}
