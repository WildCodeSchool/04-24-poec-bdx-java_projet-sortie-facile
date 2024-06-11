import { Injectable, inject } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { FullAuthenticationRouteEnum } from '@shared/models/enums/routes/full-routes';
import { TokenService } from '@shared/services/token.service';
import { Observable, map } from 'rxjs';

// export const isConnectedGuard: CanActivateFn = () => {
// 	const router = inject(Router);
// 	const authService = inject(AuthService);
// 	const token = inject(TokenService);

// 	let role: 'ROLE_USER' | 'ROLE_ADMIN';

// 	token
// 		._getTokenDetailsSubject$()
// 		.pipe(map((decodedToken: any) => decodedToken.role))
// 		.subscribe((currentRole: 'ROLE_USER' | 'ROLE_ADMIN') => {
// 			role = currentRole;
// 		});

// 	// const userData: AuthUserPrimaryDatas = JSON.parse(
// 	// 	localStorage.getItem('user') as string,
// 	// );

// 	if (role === 'ROLE_ADMIN') {
// 		return true;
// 	}

// 	router.navigate([FullAuthenticationRouteEnum.LOGIN]);
// 	return false;
// };

@Injectable({
	providedIn: 'root',
})
export class IsConnectedGuard implements CanActivate {
	role!: 'ROLE_USER' | 'ROLE_ADMIN';

	constructor(
		private router: Router,
		private tokenS: TokenService,
	) {
		this.tokenS
			._getTokenDetailsSubject$()
			.pipe(map((decodedToken: any) => decodedToken.role))
			.subscribe((role: 'ROLE_USER' | 'ROLE_ADMIN') => {
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
			this.router.navigate([FullAuthenticationRouteEnum.LOGIN]);
			return false;
		}
	}
}
