import { Component, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-account-general-management',
	templateUrl: './account-general-management.component.html',
	styleUrl: './account-general-management.component.scss',
})
export class AccountGeneralManagementComponent
	extends BaseManagementComponent
	implements OnInit
{
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
