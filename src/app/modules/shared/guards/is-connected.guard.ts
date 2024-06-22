import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { FullAuthenticationRouteEnum } from '@shared/models/enums/routes/full-routes';
import { TokenService } from '@shared/services/token.service';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class IsConnectedGuard implements CanActivate {
	role!: 'ROLE_USER' | 'ROLE_ADMIN' | null;

	constructor(
		private _router: Router,
		private _tokenService: TokenService,
	) {
		this._tokenService
			._getTokenDetailsSubject$()
			.pipe(map((decodedToken: any) => decodedToken?.role))
			.subscribe((role: 'ROLE_USER' | 'ROLE_ADMIN' | null) => {
				this.role = role;
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
		if (this.role === 'ROLE_USER') {
			return true;
		} else {
			this._router.navigate([FullAuthenticationRouteEnum.LOGIN]);
			return false;
		}
	}
}
