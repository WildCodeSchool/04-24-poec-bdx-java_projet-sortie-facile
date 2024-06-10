import { Component, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AdminService } from '@shared/services/admin.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-admin-mail-management',
	templateUrl: './admin-mail-management.component.html',
	styleUrl: './admin-mail-management.component.scss',
})
export class AdminMailManagementComponent
	extends BaseManagementComponent
	implements OnInit
{
	navItems: LayoutLink[] = [];

	constructor(
		protected override _authService: AuthService,
		private _adminService: AdminService,
	) {
		super(_authService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.navItems = this._adminService.getLayoutItems();
	}
}