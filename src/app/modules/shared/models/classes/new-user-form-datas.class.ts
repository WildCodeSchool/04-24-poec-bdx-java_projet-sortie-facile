import { AccountStatus, UserRoleEnum } from '../enums/user-role.enum';

export class NewUserFormDatas {
	id: string;
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: UserRoleEnum;
	status: AccountStatus;

	constructor(
		id: string,
		username: string,
		email: string,
		password: string,
		passwordConfirm: string,
		role: UserRoleEnum,
		status: AccountStatus,
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.passwordConfirm = passwordConfirm;
		this.role = role;
		this.status = status;
	}
}
