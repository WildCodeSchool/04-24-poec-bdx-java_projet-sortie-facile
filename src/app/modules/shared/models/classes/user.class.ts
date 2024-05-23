import { AccountStatus, UserRoleEnum } from '../enums/user-role.enum';

export class User {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRoleEnum;

	constructor(
		id: string,
		username: string,
		email: string,
		password: string,
		role: UserRoleEnum,
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}
}
