import { Component, OnInit } from '@angular/core';
import { Booking } from '@shared/models/classes/booking/booking.class';
import { BookingService, BookingTuto } from '@shared/services/booking.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-data-booking',
	templateUrl: './data-booking.component.html',
	styleUrl: './data-booking.component.scss',
})
export class DataBookingComponent implements OnInit {
	reservations$!: Observable<BookingTuto[]>;
	reservation$!: Observable<BookingTuto>;

	constructor(private bookingService: BookingService) {}

	ngOnInit(): void {
		this.reservations$ = this.bookingService.getReservationList$();
	}
}
