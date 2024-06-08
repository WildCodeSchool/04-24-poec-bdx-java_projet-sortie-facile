import { Component, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { HeaderService } from '@shared/services/header.service';
import { MenuItem } from 'primeng/api';
import { Observable, of, switchMap } from 'rxjs';

@Component({
	selector: 'app-auth-menu',
	templateUrl: './auth-menu.component.html',
	styleUrl: './auth-menu.component.scss',
})
export class AuthMenuComponent implements OnInit {
	connectedUser!: AuthUserPrimaryDatas;

	profileItems$!: Observable<MenuItem[]>;

	constructor(
		private _authService: AuthService,
		private _headerService: HeaderService,
	) {}

	ngOnInit() {
		this.profileItems$ = this._headerService.getIsLoggedInItems$();

		of((this.connectedUser = this._authService.getConnectedUserData()))
			.pipe(switchMap(() => this._authService.getConnectedUserObservable()))
			.subscribe(user => {
				this.connectedUser = user;
			});
	}
}
