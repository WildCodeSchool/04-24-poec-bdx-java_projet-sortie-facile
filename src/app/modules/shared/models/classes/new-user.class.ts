import { AccountStatus, UserRoleEnum } from '../enums/user-role.enum';

export class NewUser {
	id: string;
	username: string;
	email: string;
	password: string;
	confirmation: string;
	role: UserRoleEnum;
	status: AccountStatus;

	constructor(
		id: string,
		username: string,
		email: string,
		password: string,
		confirmation: string,
		role: UserRoleEnum,
		status: AccountStatus,
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.confirmation = confirmation;
		this.role = role;
		this.status = status;
	}
}
