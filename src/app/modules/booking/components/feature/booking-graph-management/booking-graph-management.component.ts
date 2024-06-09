import { Component } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-booking-graph-management',
	templateUrl: './booking-graph-management.component.html',
	styleUrl: './booking-graph-management.component.scss',
})
export class BookingGraphManagementComponent extends BaseManagementComponent {
	constructor(protected override _authService: AuthService) {
		super(_authService);
	}
}
