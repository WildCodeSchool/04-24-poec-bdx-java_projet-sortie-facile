import { Component } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-admin-mail-management',
	templateUrl: './admin-mail-management.component.html',
	styleUrl: './admin-mail-management.component.scss',
})
export class AdminMailManagementComponent extends BaseManagementComponent {
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
