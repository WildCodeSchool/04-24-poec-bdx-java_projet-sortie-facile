import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';

export type newUser = {
	id: string;
	username: string;
	email: string;
	password: string;
	confirmation: string;
	role: UserRoleEnum;
	status: AccountStatus;
	userDetailsId: string;
};

export type newUserDatas = Pick<
	newUser,
	'id' | 'username' | 'email' | 'role' | 'status' | 'password'
>;

export type newUserFormDatas = Pick<
	newUser,
	'id' | 'username' | 'email' | 'role' | 'status' | 'password'
> & {
	passwordConfirm: string;
};
