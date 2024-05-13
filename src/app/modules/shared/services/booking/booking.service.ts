import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reservation } from '@shared/models/types/reservation.type';
import { reservations } from '@shared/models/types/reservations.type';
import { Observable, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	constructor(private http: HttpClient) {}

	getReservationList$(): Observable<reservation[]> {
		return this.http
			.get<reservations>('http://localhost:3000/reservation')
			.pipe(map((response: reservations) => response));
	}
}
