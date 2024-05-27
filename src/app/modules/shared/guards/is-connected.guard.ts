import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { FullAuthenticationRouteEnum } from '@shared/models/enums/routes/full-routes';

export const isConnectedGuard: CanActivateFn = () => {
	const router = inject(Router);
	const authService = inject(AuthService);

	const userData: AuthUserPrimaryDatas = JSON.parse(
		localStorage.getItem('user') as string,
	);

	if (
		userData &&
		(userData.role === UserRoleEnum.ADMIN ||
			userData.role === UserRoleEnum.USER)
	) {
		authService.setConnectedUserData(userData);

		return true;
	}

	router.navigate([FullAuthenticationRouteEnum.LOGIN]);
	return false;
};
