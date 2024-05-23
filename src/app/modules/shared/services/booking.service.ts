import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { reservation } from '@shared/models/types/reservation.type';
import {
	Observable,
	catchError,
	forkJoin,
	map,
	of,
	switchMap,
	tap,
} from 'rxjs';
import { ActivityService } from './activity.service';
import { UserService } from './user.service';
import { Booking } from '@shared/models/classes/booking.class';

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	constructor(
		private http: HttpClient,
		private router: Router,
		private activityService: ActivityService,
		private userService: UserService,
	) {}

	onSubmit(form: NgForm): void {
		this.postNewReservation$(form.value).subscribe();
	}

	// getReservationList$(): Observable<reservation[]> {
	// 	return this.http
	// 		.get<reservations>('http://localhost:3000/reservation')
	// 		.pipe(map((response: reservations) => response));
	// }

	getReservationList$(): Observable<Booking[]> {
		return this.http.get<Booking[]>('http://localhost:3000/reservation').pipe(
			tap(v => {
				console.log(v);
				return v;
			}),
			map((reservation: any) => reservation),
		);
		// switchMap(reservations => {
		// 	const observables: Observable<Booking[]> = [];
		// 	reservations.forEach(reservation => {
		// 		console.log(reservation);
		// observables.push(
		// 	forkJoin({
		// 		reservation: of(reservation),
		// 		activity: this.activityService.getActivityById$(
		// 			reservation.activityId,
		// 		),
		// 		userDetails: this.userService.getUserInfos$(reservation.userId),
		// 	}).pipe(
		// 		map(({ reservation, activity, userDetails }) => ({
		// 			...reservation,
		// 			activityId: activity,
		// 			userId: userDetails,
		// 		})),
		// 	),
		// 		// );
		// 	});
		// 	return forkJoin(observables);
		// 	// }),
	}
	postNewReservation$(newReservation: Booking): Observable<Booking> {
		return this.http.get<Booking[]>('http://localhost:3000/reservation').pipe(
			switchMap(reservations => {
				const nextId =
					reservations.length > 0
						? Number(reservations[reservations.length - 1].id) + 1
						: 1;
				newReservation.id = String(nextId);

				return this.http
					.post<Booking>('http://localhost:3000/reservation', newReservation)
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
