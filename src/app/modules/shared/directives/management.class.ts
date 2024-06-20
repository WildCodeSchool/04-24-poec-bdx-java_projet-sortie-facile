import { Directive, Input, OnInit } from '@angular/core';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { TokenService } from '@shared/services/token.service';

@Directive()
export abstract class BaseManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: AuthUserResponse;

	constructor(protected _tokenService: TokenService) {}

	ngOnInit(): void {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: AuthUserResponse) => {
				this.connectedUser = connectedUser;
			});
	}
}
