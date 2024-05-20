import { Directive, Input, OnInit } from '@angular/core';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth.service';

@Directive()
export abstract class BaseAccountManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: UserAuthPrimaryDatas;

	constructor(protected _authService: AuthService) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
	}
}
