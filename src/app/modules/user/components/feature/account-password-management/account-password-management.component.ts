import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';

@Component({
	selector: 'app-account-password-management',
	templateUrl: './account-password-management.component.html',
	styleUrl: './account-password-management.component.scss',
})
export class AccountPasswordManagementComponent extends BaseAccountManagementComponent {
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
