import { AuthProviderNameEnum } from '@shared/models/enums/auth-provider';
import { newUser } from '@shared/models/types/newUser.model';
import { AuthProvider } from '@shared/models/types/provider.type';
import {
	UserAuth,
	UserAuthPrimaryDatas,
	UserListResponseApi,
} from '@shared/models/types/user-list-response-api.type';
import { BehaviorSubject, Observable } from 'rxjs';

export class AuthUserServiceUtils {
	protected _providerNameList: AuthProvider[] = [
		{ name: AuthProviderNameEnum.GOOGLE },
		{ name: AuthProviderNameEnum.FACEBOOK },
		{ name: AuthProviderNameEnum.TWITTER },
	];

	protected BASE_URL: string = 'http://localhost:3000/user';

	protected _userConnected!: UserAuthPrimaryDatas;

	protected _isLoggedInSubject: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);

	public getAuthUserFormatted(
		user: UserAuthPrimaryDatas | newUser,
	): UserAuthPrimaryDatas | newUser {
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
		users: UserListResponseApi,
		username: string,
		password: string,
	) {
		return users.find((user: UserAuth) => {
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

	public getConnectedUserData(): UserAuthPrimaryDatas {
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
