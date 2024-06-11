import { Directive, Input, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';

@Directive()
export abstract class BaseAccountManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: AuthUserPrimaryDatas;

	constructor(
		protected _authService: AuthService,
		protected _tokenService: TokenService,
	) {}

	ngOnInit(): void {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: any) => {
				console.log(connectedUser);

				this.connectedUser = connectedUser;
			});
	}
}
