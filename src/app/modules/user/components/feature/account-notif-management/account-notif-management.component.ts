import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AccountService } from '@shared/services/account.service';
import { ActivityService } from '@shared/services/activity.service';
import { TokenService } from '@shared/services/token.service';

@Component({
	selector: 'app-account-notif-management',
	templateUrl: './account-notif-management.component.html',
	styleUrl: './account-notif-management.component.scss',
})
export class AccountNotifManagementComponent
	extends BaseManagementComponent
	implements OnInit
{
	navItems: LayoutLink[] = [];
	newActivityCreated: boolean = false;
	fullActivityRouteEnum = FullActivityRouteEnum;
	constructor(
		protected override _tokenService: TokenService,
		private _accountService: AccountService,
		private _activityService: ActivityService,
		private _router: Router,
	) {
		super(_tokenService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.navItems = this._accountService.getLayoutItems();
		this._activityService.newActivity$.subscribe((NewActivity: boolean) => {
			if (NewActivity) {
				this.newActivityCreated = NewActivity;
			}
		});
	}

	onNewActivityClicked() {
		this.newActivityCreated = false;
		setTimeout(() => {
			this._router.navigate([this.fullActivityRouteEnum.HOME]); // Redirige après un délai
		}, 200);
		// this._router.navigate([this.fullActivityRouteEnum.HOME]);
	}
}
