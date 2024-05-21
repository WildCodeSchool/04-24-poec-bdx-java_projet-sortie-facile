import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { BaseAccountManagementComponent } from '@user/directives/account-management.class';

@Component({
	selector: 'app-account-profile-management',
	templateUrl: './account-profile-management.component.html',
	styleUrl: './account-profile-management.component.scss',
})
export class AccountProfileManagementComponent extends BaseAccountManagementComponent {
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
