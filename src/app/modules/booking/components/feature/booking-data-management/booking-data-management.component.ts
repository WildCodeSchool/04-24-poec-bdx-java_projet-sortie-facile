import { Component } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-booking-data-management',
	templateUrl: './booking-data-management.component.html',
	styleUrl: './booking-data-management.component.scss',
})
export class BookingDataManagementComponent extends BaseManagementComponent {
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
