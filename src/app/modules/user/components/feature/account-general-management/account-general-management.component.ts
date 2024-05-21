import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';

@Component({
	selector: 'app-account-general-management',
	templateUrl: './account-general-management.component.html',
	styleUrl: './account-general-management.component.scss',
})
export class AccountGeneralManagementComponent
	extends BaseAccountManagementComponent
	implements OnInit
{
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
