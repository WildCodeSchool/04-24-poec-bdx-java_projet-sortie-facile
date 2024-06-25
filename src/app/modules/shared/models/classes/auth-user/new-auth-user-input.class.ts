import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';

export class NewAuthUserInput {
	username: string;
	email: string;
	password: string;
	requiredRole: UserRoleEnum;

	constructor(
		username: string,
		email: string,
		password: string,
		requiredRole: UserRoleEnum,
	) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.requiredRole = requiredRole;
	}
}
