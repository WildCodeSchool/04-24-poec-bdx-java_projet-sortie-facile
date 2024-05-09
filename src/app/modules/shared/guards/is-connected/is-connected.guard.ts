import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthPrimaryDatas } from '../../models/types/user-list-response-api.type';
import { UserRoleEnum } from '../../models/enums/user-role.enum';
import { AuthService } from '../../services/auth/auth.service';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const userData: UserAuthPrimaryDatas = JSON.parse(
    localStorage.getItem('user') as string
  );

  if (
    userData &&
    (userData.role === UserRoleEnum.ADMIN ||
      userData.role === UserRoleEnum.USER)
  ) {
    authService.setConnectedUserData(userData);
    console.log('user connected', authService.getConnectedUserData());

    // TODO
    // when back java ok
    // verify auth token

    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
