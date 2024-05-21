import { AccountStatus, UserRoleEnum } from '../enums/user-role.enum';

export class NewUserFormDatas {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: UserRoleEnum;
	status: AccountStatus;

	constructor(
		username: string,
		email: string,
		password: string,
		passwordConfirm: string,
		role: UserRoleEnum,
		status: AccountStatus,
	) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.passwordConfirm = passwordConfirm;
		this.role = role;
		this.status = status;
	}
}
