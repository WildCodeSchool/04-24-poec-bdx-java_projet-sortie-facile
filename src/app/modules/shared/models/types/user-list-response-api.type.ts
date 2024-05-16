import { AccountStatus, UserRoleEnum } from '@models/enums/user-role.enum';

export type UserAuth = {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRoleEnum;
	status: AccountStatus;
};

export type UserListResponseApi = UserAuth[];

export type UserAuthPrimaryDatas = Pick<
	UserAuth,
	'id' | 'username' | 'email' | 'role' | 'status'
>;

export type UserAuthPatch = Partial<UserAuth>;
