import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';

export class AuthUser {
	id: string;
	username: string;
	email: string;
	password: string;
	role: UserRoleEnum;
	status: AccountStatus;
	UserProfileId: string;

	constructor(
		id: string,
		username: string,
		email: string,
		password: string,
		role: UserRoleEnum,
		status: AccountStatus,
		UserProfileId: string,
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.status = status;
		this.UserProfileId = UserProfileId;
	}
}
