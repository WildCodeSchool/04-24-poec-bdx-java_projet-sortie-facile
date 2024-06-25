import { Component, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AccountService } from '@shared/services/account.service';
import { TokenService } from '@shared/services/token.service';

@Component({
	selector: 'app-account-password-management',
	templateUrl: './account-password-management.component.html',
	styleUrl: './account-password-management.component.scss',
})
export class AccountPasswordManagementComponent
	extends BaseManagementComponent
	implements OnInit
{
	navItems: LayoutLink[] = [];

	constructor(
		protected override _tokenService: TokenService,
		private _accountService: AccountService,
	) {
		super(_tokenService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.navItems = this._accountService.getLayoutItems();
	}
}
