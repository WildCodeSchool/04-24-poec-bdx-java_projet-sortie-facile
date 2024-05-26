import { Component, OnInit } from '@angular/core';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';
import { BookingService } from '@shared/services/booking.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-booking-home',
	templateUrl: './booking-home.component.html',
	styleUrl: './booking-home.component.scss',
})
export class BookingHomeComponent implements OnInit {
	reservations$!: Observable<BookingUserActivity[]>;
	reservation$!: Observable<BookingUserActivity>;

	constructor(private bookingService: BookingService) {}

	ngOnInit(): void {
		this.reservations$ = this.bookingService.getBookingList$();
	}
}
