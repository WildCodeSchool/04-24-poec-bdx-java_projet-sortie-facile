import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
	Observable,
	catchError,
	forkJoin,
	map,
	mergeMap,
	switchMap,
	tap,
} from 'rxjs';
import { ActivityService } from './activity.service';
import { UserService } from './user.service';
import { Booking } from '@shared/models/classes/booking/booking.class';
import { Activity } from '@activity/models/classes/activity.class';
import { AuthUser } from '@shared/models/classes/auth-user/auth-user.class';
import { BookingListResponseApi } from '@shared/models/classes/booking';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	private reservationsUrl = 'http://localhost:3000/reservation';
	private usersUrl = 'http://localhost:3000/users';
	private activitiesUrl = 'http://localhost:3000/activities';

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

	getReservationList$(): Observable<BookingUserActivity[]> {
		return this.http.get<Booking[]>('http://localhost:3000/reservation').pipe(
			mergeMap((reservations: BookingListResponseApi) => {
				const detailedReservations$ = reservations.map(
					(reservation: Booking) => {
						const user$ = this.http.get<AuthUser>(
							`http://localhost:3000/user/${reservation.userId}`,
						);

						const activity$ = this.http.get<Activity>(
							`http://localhost:3000/activity/${reservation.activityId}`,
						);

						return forkJoin([user$, activity$]).pipe(
							map(([user, activity]) => ({
								...reservation,
								user,
								activity,
							})),
						);
					},
				);

				// Utilisez forkJoin pour attendre que toutes les requêtes soient terminées
				return forkJoin(detailedReservations$);
			}),
			tap(l => console.log(l)),

			// switchMap(reservations => {
			// const observables: Observable<Booking[]> = [];
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
			// 		);
			// 	});
			// 	return forkJoin(observables);
			// }),
		);
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
