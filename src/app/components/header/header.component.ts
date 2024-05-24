import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { HeaderService } from '@shared/services/header.service';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
	profileItems$!: Observable<MenuItem[]>;
	items$!: Observable<MenuItem[]>;

	constructor(
		private _authService: AuthService,
		private _headerService: HeaderService,
	) {}

	ngOnInit() {
		this._authService.checkIfUserIsConnectedAndNotifyLoggedInStatus();
		this.items$ = this._headerService.getPrimaryItems$();
		this.profileItems$ = this._headerService.getIsLoggedInItems$();
	}
}
