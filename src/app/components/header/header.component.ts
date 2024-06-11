import { Component, Input, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { HeaderService } from '@shared/services/header.service';
import { TokenService } from '@shared/services/token.service';
import { MenuItem } from 'primeng/api';
import { Observable, map, of, switchMap } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	@Input() connectedUser!: AuthUserPrimaryDatas;

	profileItems$!: Observable<MenuItem[]>;
	items$!: Observable<MenuItem[]>;
	isUserLoggedIn: boolean = false;

	constructor(
		private _authService: AuthService,
		private _headerService: HeaderService,
		private _tokenService: TokenService,
	) {}

	ngOnInit() {
		this._authService.checkIfUserIsConnectedAndNotifyLoggedInStatus();
		this.items$ = this._headerService.getPrimaryItems$();
		this.profileItems$ = this._headerService.getIsLoggedInItems$();

		this._tokenService
			._getTokenDetailsSubject$()
			.pipe(
				map((connectedUser: any) => {
					this.connectedUser = connectedUser;
				}),
				switchMap(() => this._authService.getConnectedUserObservable()),
			)
			.subscribe(user => {
				this.connectedUser = user;
			});
	}
}
