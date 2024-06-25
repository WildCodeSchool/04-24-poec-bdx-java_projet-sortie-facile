import { Component, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AccountService } from '@shared/services/account.service';
import { TokenService } from '@shared/services/token.service';

@Component({
	selector: 'app-account-general-management',
	templateUrl: './account-general-management.component.html',
	styleUrl: './account-general-management.component.scss',
})
export class AccountGeneralManagementComponent
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
