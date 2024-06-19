// import { Component, OnInit } from '@angular/core';
// import { BaseManagementComponent } from '@shared/directives/management.class';
// import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
// import { AccountService } from '@shared/services/account.service';
// import { AuthService } from '@shared/services/auth.service';

// @Component({
// 	selector: 'app-account-profile-management',
// 	templateUrl: './account-profile-management.component.html',
// 	styleUrl: './account-profile-management.component.scss',
// })
// export class AccountProfileManagementComponent
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
