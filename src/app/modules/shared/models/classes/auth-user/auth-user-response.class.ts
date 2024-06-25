import { UserRoleEnum } from '@shared/models/enums/user-role.enum';

export class AuthUserResponse {
	exp: number;
	iat: number;
	id: number;
	nickname: string;
	role: UserRoleEnum;
	sub: string;

	constructor(
		exp: number,
		iat: number,
		id: number,
		nickname: string,
		role: UserRoleEnum,
		sub: string,
	) {
		this.exp = exp;
		this.iat = iat;
		this.id = id;
		this.nickname = nickname;
		this.role = role;
		this.sub = sub;
	}
}
