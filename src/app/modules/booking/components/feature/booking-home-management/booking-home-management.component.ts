import { Component, Input, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';
import { AuthService } from '@shared/services/auth.service';
import { BookingService } from '@shared/services/booking.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-booking-home-management',
	templateUrl: './booking-home-management.component.html',
	styleUrl: './booking-home-management.component.scss',
})
export class BookingHomeManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: AuthUserPrimaryDatas;
	reservations$!: Observable<BookingUserActivity[]>;
	reservation$!: Observable<BookingUserActivity>;

	constructor(
		protected _authService: AuthService,
		private bookingService: BookingService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.reservations$ = this.bookingService.getBookingList$();
	}
}
