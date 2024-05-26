import { AuthProviderNameEnum } from '@shared/models/enums/auth-provider';
import { NewAuthUser } from '@shared/models/classes/auth-user/new-auth-user.class';
import { AuthProvider } from '@shared/models/types/auth/provider.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '@shared/models/classes/auth-user/auth-user.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthUserListResponseApi } from '@shared/models/classes/auth-user';

export class AuthUserServiceUtils {
	protected _providerNameList: AuthProvider[] = [
		{ name: AuthProviderNameEnum.GOOGLE },
		{ name: AuthProviderNameEnum.FACEBOOK },
		{ name: AuthProviderNameEnum.TWITTER },
	];

	protected BASE_URL: string = 'http://localhost:3000/user';

	protected _userConnected!: AuthUserPrimaryDatas;

	protected _isLoggedInSubject: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);

	public getAuthUserFormatted(
		user: AuthUserPrimaryDatas | NewAuthUser,
	): AuthUserPrimaryDatas | NewAuthUser {
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			role: user.role,
			status: user.status,
			userDetailsId: user.userDetailsId,
		};
	}

	public findUserByUsernameAndPassword(
		users: AuthUserListResponseApi,
		username: string,
		password: string,
	) {
		return users.find((user: AuthUser) => {
			return user.username === username && user.password === password;
		});
	}

	public checkIfUserIsConnectedAndNotifyLoggedInStatus(): void {
		if (localStorage.getItem('user')) {
			this.setConnectedUserData(
				JSON.parse(localStorage.getItem('user') as string),
			);

			this.notifyLoggedInStatus(true);
		}
	}

	public getProviderNameList(): AuthProvider[] {
		return this._providerNameList;
	}

	public getConnectedUserData(): AuthUserPrimaryDatas {
		return this._userConnected;
	}

	public setConnectedUserData(user: any): void {
		this._userConnected = user;
	}

	public get isLoggedIn(): Observable<boolean> {
		return this._isLoggedInSubject.asObservable();
	}

	public notifyLoggedInStatus(status: boolean): void {
		this._isLoggedInSubject.next(status);
	}
}
