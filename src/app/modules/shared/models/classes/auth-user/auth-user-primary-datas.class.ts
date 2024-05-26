import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';

export class AuthUserPrimaryDatas {
	id: string;
	username: string;
	email: string;
	role: UserRoleEnum;
	status: AccountStatus;
	userDetailsId: string;

	constructor(
		id: string,
		username: string,
		email: string,
		role: UserRoleEnum,
		status: AccountStatus,
		userDetailsId: string,
	) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.role = role;
		this.status = status;
		this.userDetailsId = userDetailsId;
	}
}
