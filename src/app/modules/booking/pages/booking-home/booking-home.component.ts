import { Component, OnInit } from '@angular/core';
import { Booking } from '@shared/models/classes/booking.class';
import { BookingService, BookingTuto } from '@shared/services/booking.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-booking-home',
	templateUrl: './booking-home.component.html',
	styleUrl: './booking-home.component.scss',
})
export class BookingHomeComponent implements OnInit {
	reservations$!: Observable<BookingTuto[]>;
	reservation$!: Observable<BookingTuto>;

	constructor(private bookingService: BookingService) {}

	ngOnInit(): void {
		this.reservations$ = this.bookingService.getReservationList$();
	}
}
