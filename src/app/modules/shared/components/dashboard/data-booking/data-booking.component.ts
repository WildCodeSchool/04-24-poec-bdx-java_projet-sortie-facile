import { Component, OnInit } from '@angular/core';
import { reservation } from '@shared/models/types/reservation.type';
import { BookingService } from '@shared/services/booking.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-data-booking',
	templateUrl: './data-booking.component.html',
	styleUrl: './data-booking.component.scss',
})
export class DataBookingComponent implements OnInit {
	reservations$!: Observable<reservation[]>;
	reservation$!: Observable<reservation>;

	constructor(private bookingService: BookingService) {}

	ngOnInit(): void {
		this.reservations$ = this.bookingService.getReservationList$();
	}
}
