import { AccountStatus, UserRoleEnum } from "../enums/user-role.enum";

export type newUser = {
	id: string;
	username: string;
	email: string;
	password: string;
	confirmation: string;
	role: UserRoleEnum;
	status: AccountStatus;
};

export type newUserDatas = Pick<
	newUser,
	'id' | 'username' | 'email' | 'role' | 'status' | 'password'
>;
