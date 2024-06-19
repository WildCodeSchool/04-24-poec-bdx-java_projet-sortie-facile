// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '@shared/services/auth.service';
// import { BaseManagementComponent } from '@shared/directives/management.class';
// import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
// import { AccountService } from '@shared/services/account.service';

// @Component({
// 	selector: 'app-account-password-management',
// 	templateUrl: './account-password-management.component.html',
// 	styleUrl: './account-password-management.component.scss',
// })
// export class AccountPasswordManagementComponent
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
