import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';

export type UserAuth = {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRoleEnum;
	status: AccountStatus;
	userDetailsId: string;
};

export type UserListResponseApi = UserAuth[];

export type UserAuthPrimaryDatas = Pick<
	UserAuth,
	'id' | 'username' | 'email' | 'role' | 'status' | 'userDetailsId'
>;

export type UserAuthPatch = Partial<UserAuth>;
