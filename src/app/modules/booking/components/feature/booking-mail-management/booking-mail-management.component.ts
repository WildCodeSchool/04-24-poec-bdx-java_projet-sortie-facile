import { Component } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-booking-mail-management',
	templateUrl: './booking-mail-management.component.html',
	styleUrl: './booking-mail-management.component.scss',
})
export class BookingMailManagementComponent extends BaseManagementComponent {
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
