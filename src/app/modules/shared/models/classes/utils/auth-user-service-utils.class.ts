import { AuthProviderNameEnum } from '@shared/models/enums/auth-provider';
import { NewAuthUser } from '@shared/models/classes/auth-user/new-auth-user.class';
import { AuthProvider } from '@shared/models/types/auth/provider.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '@shared/models/classes/auth-user/auth-user.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthUserListResponseApi } from '@shared/models/classes/auth-user';
import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';

export class AuthUserServiceUtils {
	protected _providerNameList: AuthProvider[] = [
		{ name: AuthProviderNameEnum.GOOGLE },
		{ name: AuthProviderNameEnum.FACEBOOK },
		{ name: AuthProviderNameEnum.TWITTER },
	];

	protected BASE_URL: string = 'http://localhost:3000/user';

	protected _userConnected!: AuthUserPrimaryDatas;

	protected _userConnectedSubject: BehaviorSubject<AuthUserPrimaryDatas> =
		new BehaviorSubject<AuthUserPrimaryDatas>({
			id: '',
			username: '',
			email: '',
			role: UserRoleEnum.USER,
			status: AccountStatus.ACTIVE,
			userDetailsId: '',
		});

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
		const user = localStorage.getItem('user');

		if (user) {
			const parsedUser = JSON.parse(user) as AuthUserPrimaryDatas;
			this.setConnectedUserData(parsedUser);
			this.notifyLoggedInStatus(true);
		} else {
			this.notifyLoggedInStatus(false);
		}
	}

	public getProviderNameList(): AuthProvider[] {
		return this._providerNameList;
	}

	public getConnectedUserData(): AuthUserPrimaryDatas {
		return this._userConnectedSubject.value;
	}

	public getConnectedUserObservable(): Observable<AuthUserPrimaryDatas> {
		return this._userConnectedSubject.asObservable();
	}

	public setConnectedUserData(user: AuthUserPrimaryDatas): void {
		this._userConnectedSubject.next(user);
	}

	public get isLoggedIn(): Observable<boolean> {
		return this._isLoggedInSubject.asObservable();
	}

	public notifyLoggedInStatus(status: boolean): void {
		this._isLoggedInSubject.next(status);
	}
}
