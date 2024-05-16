import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { HeaderService } from '@shared/services/header.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	items!: MenuItem[];

	constructor(
		private _authService: AuthService,
		private _headerService: HeaderService,
	) {}

	ngOnInit() {
		if (localStorage.getItem('user')) {
			this._authService.setConnectedUserData(
				JSON.parse(localStorage.getItem('user') as string),
			);
			this._authService.notifyLoggedInStatus(true);
		}

		this._authService.isLoggedIn.subscribe((loggedIn: boolean) => {
			this.items = this._headerService.getConnectedItems(loggedIn);
		});
	}
}
