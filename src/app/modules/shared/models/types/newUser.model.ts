import { AccountStatus, UserRoleEnum } from '@models/enums/user-role.enum';

export type newUser = {
	id: string;
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: UserRoleEnum;
	status: AccountStatus;
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
