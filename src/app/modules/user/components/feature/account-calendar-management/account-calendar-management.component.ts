// import { Component, LOCALE_ID, OnInit } from '@angular/core';
// import { BaseManagementComponent } from '@shared/directives/management.class';
// import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
// import { AccountService } from '@shared/services/account.service';
// import { AuthService } from '@shared/services/auth.service';

// @Component({
// 	selector: 'app-account-calendar-management',
// 	templateUrl: './account-calendar-management.component.html',
// 	styleUrl: './account-calendar-management.component.scss',
// 	providers: [
// 		{ provide: LOCALE_ID, useValue: 'fr' },
// 		{ provide: 'FULLCALENDAR_LOCALE', useValue: 'fr' },
// 	],
// })
// export class AccountCalendarManagementComponent
// 	extends BaseManagementComponent
// 	implements OnInit
// {
// 	navItems: LayoutLink[] = [];

// 	constructor(
// 		protected override _authService: AuthService,
// 		private _accountService: AccountService,
// 	) {
// 		super(_authService);
// 	}

// 	override ngOnInit(): void {
// 		super.ngOnInit();

// 		this.navItems = this._accountService.getLayoutItems();
// 	}
// }
