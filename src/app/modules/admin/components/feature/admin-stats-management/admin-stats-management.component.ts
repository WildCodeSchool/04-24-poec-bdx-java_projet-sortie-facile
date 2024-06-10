import { Component } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-admin-stats-management',
	templateUrl: './admin-stats-management.component.html',
	styleUrl: './admin-stats-management.component.scss',
})
export class AdminStatsManagementComponent extends BaseManagementComponent {
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
