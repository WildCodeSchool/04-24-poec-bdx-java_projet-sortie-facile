import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { reservation } from '@shared/models/types/reservation.type';
import { reservations } from '@shared/models/types/reservations.type';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	constructor(
		private http: HttpClient,
		private router: Router,
	) {}

	onSubmit(form: NgForm): void {
		this.postNewReservation$(form.value).subscribe();
	}

	getReservationList$(): Observable<reservation[]> {
		return this.http
			.get<reservations>('http://localhost:3000/reservation')
			.pipe(map((response: reservations) => response));
	}

	postNewReservation$(newReservation: reservation): Observable<reservation> {
		return this.http
			.get<reservation[]>('http://localhost:3000/reservation')
			.pipe(
				switchMap(reservations => {
					const nextId =
						reservations.length > 0
							? Number(reservations[reservations.length - 1].id) + 1
							: 1;
					newReservation.id = String(nextId);

					return this.http
						.post<reservation>(
							'http://localhost:3000/reservation',
							newReservation,
						)
						.pipe(
							tap(() => {
								this.router.navigate(['/user/home']);
							}),
						);
				}),

				catchError(error => {
					throw error;
				}),
			);
	}
}
