import { Component, OnInit } from '@angular/core';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { HeaderService } from '@shared/services/header.service';
import { TokenService } from '@shared/services/token.service';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-auth-menu',
	templateUrl: './auth-menu.component.html',
	styleUrl: './auth-menu.component.scss',
})
export class AuthMenuComponent implements OnInit {
	connectedUser!: AuthUserResponse;
	profileItems$!: Observable<MenuItem[]>;

	constructor(
		private _headerService: HeaderService,
		private _tokenService: TokenService,
	) {}

	ngOnInit() {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: AuthUserResponse) => {
				this.connectedUser = connectedUser;
				this.profileItems$ = this._headerService.getIsLoggedInItems$(
					this.connectedUser,
				);
			});
	}
}
