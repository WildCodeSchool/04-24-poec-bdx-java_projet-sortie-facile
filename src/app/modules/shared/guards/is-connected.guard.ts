import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth.service';

export const isConnectedGuard: CanActivateFn = () => {
	const router = inject(Router);
	const authService = inject(AuthService);

	const userData: UserAuthPrimaryDatas = JSON.parse(
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

	router.navigate(['/auth/login']);
	return false;
};
