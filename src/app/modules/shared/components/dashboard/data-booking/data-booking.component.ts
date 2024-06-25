import { Component, OnInit } from '@angular/core';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';
import { BookingService } from '@shared/services/booking.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-data-booking',
	templateUrl: './data-booking.component.html',
	styleUrl: './data-booking.component.scss',
})
export class DataBookingComponent implements OnInit {
	reservations$!: Observable<BookingUserActivity[]>;
	reservation$!: Observable<BookingUserActivity>;

	constructor(private bookingService: BookingService) {}

	ngOnInit(): void {
		this.reservations$ = this.bookingService.getBookingList$();
	}
}
