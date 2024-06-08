import { Component, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { FullBookingRouteEnum } from '@shared/models/enums/routes/full-routes';
import { UserRoleEnum } from '@shared/models/enums/user-role.enum';
import { AuthService } from '@shared/services/auth.service';
import { HeaderService } from '@shared/services/header.service';
import { MenuItem } from 'primeng/api';
import { Observable, map } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	fullBookingRouteEnum = FullBookingRouteEnum;
	profileItems$!: Observable<MenuItem[]>;
	items$!: Observable<MenuItem[]>;
	isUserLoggedIn: boolean = false;
	isAdmin: boolean = false;
	constructor(
		private _authService: AuthService,
		private _headerService: HeaderService,
	) {}

	ngOnInit() {
		this._authService.checkIfUserIsConnectedAndNotifyLoggedInStatus();
		this.items$ = this._headerService.getPrimaryItems$();
		this.profileItems$ = this._headerService.getIsLoggedInItems$();
		this._authService
			.getConnectedUserObservable()
			.pipe(
				map((user: AuthUserPrimaryDatas) => user.role === UserRoleEnum.ADMIN),
			)
			.subscribe((isAdmin: boolean) => {
				this.isAdmin = isAdmin;
			});
	}
}
