import { Component } from '@angular/core';
import { reservation } from '@shared/models/types/reservation.type';
import { ActivityService } from '@shared/services/activity.service';
import { BookingService } from '@shared/services/booking/booking.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-booking-home',
	templateUrl: './booking-home.component.html',
	styleUrl: './booking-home.component.scss',
})
export class BookingHomeComponent {
	reservations$!: Observable<reservation[]>;
	reservation$!: Observable<reservation>;
	constructor(private bookingService: BookingService) {}

	ngOnInit(): void {
		this.reservations$ = this.bookingService.getReservationList$();
		console.log(this.reservations$);
	}
}
