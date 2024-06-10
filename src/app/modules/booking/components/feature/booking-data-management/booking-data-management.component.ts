import { Component, OnInit } from '@angular/core';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { AuthService } from '@shared/services/auth.service';
import { BookingService } from '@shared/services/booking.service';

@Component({
	selector: 'app-booking-data-management',
	templateUrl: './booking-data-management.component.html',
	styleUrl: './booking-data-management.component.scss',
})
export class BookingDataManagementComponent
	extends BaseManagementComponent
	implements OnInit
{
	navItems: LayoutLink[] = [];

	constructor(
		protected override _authService: AuthService,
		private _bookingService: BookingService,
	) {
		super(_authService);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.navItems = this._bookingService.getLayoutItems();
	}
}
