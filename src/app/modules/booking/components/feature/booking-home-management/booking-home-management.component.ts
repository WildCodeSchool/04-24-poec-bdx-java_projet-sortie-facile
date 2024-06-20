// import { Component, OnInit } from '@angular/core';
// import { BaseManagementComponent } from '@shared/directives/management.class';
// import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';
// import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
// import { AuthService } from '@shared/services/auth.service';
// import { BookingService } from '@shared/services/booking.service';
// import { Observable } from 'rxjs';

// @Component({
// 	selector: 'app-booking-home-management',
// 	templateUrl: './booking-home-management.component.html',
// 	styleUrl: './booking-home-management.component.scss',
// })
// export class BookingHomeManagementComponent
// 	extends BaseManagementComponent
// 	implements OnInit
// {
// 	reservations$!: Observable<BookingUserActivity[]>;
// 	reservation$!: Observable<BookingUserActivity>;
// 	navItems: LayoutLink[] = [];

// 	constructor(
// 		protected override _authService: AuthService,
// 		private bookingService: BookingService,
// 		private _bookingService: BookingService,
// 	) {
// 		super(_authService);
// 	}

// 	override ngOnInit(): void {
// 		super.ngOnInit();

// 		this.reservations$ = this.bookingService.getBookingList$();
// 		this.navItems = this._bookingService.getLayoutItems();
// 	}
// }
