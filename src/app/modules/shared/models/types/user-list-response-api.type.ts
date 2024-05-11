import { UserRoleEnum } from '../enums/user-role.enum';

export type UserAuth = {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRoleEnum;
};

export type UserListResponseApi = UserAuth[];

export type UserAuthPrimaryDatas = Pick<
	UserAuth,
	'id' | 'username' | 'email' | 'role'
>;
