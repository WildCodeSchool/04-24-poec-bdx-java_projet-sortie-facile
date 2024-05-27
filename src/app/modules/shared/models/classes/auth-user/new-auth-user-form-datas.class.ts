import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';

export class NewAuthUserFormDatas {
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	role: UserRoleEnum;
	status: AccountStatus;
	userDetailsId: string;

	constructor(
		username: string,
		email: string,
		password: string,
		passwordConfirm: string,
		role: UserRoleEnum,
		status: AccountStatus,
		userDetailsId: string,
	) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.passwordConfirm = passwordConfirm;
		this.role = role;
		this.status = status;
		this.userDetailsId = userDetailsId;
	}
}
