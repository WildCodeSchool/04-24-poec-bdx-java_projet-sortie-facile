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
import { Booking } from '@shared/models/classes/booking/booking.class';
import { Activity } from '@activity/models/classes/activity.class';
import { AuthUser } from '@shared/models/classes/auth-user/auth-user.class';
import { BookingListResponseApi } from '@shared/models/classes/booking';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	private readonly _BASE_URL = 'http://localhost:3000/booking';
	private readonly _USER_URL = 'http://localhost:3000/user';
	private readonly _ACTIVITY_URL = 'http://localhost:3000/activity';

	constructor(
		private http: HttpClient,
		private router: Router,
	) {}

	onSubmit(form: NgForm): void {
		this.postNewBooking$(form.value).subscribe();
	}

	getBookingList$(): Observable<BookingUserActivity[]> {
		return this.http.get<Booking[]>(this._BASE_URL).pipe(
			mergeMap((bookings: BookingListResponseApi) => {
				const detailedReservations$ = bookings.map((booking: Booking) => {
					const user$: Observable<AuthUser> = this.http.get<AuthUser>(
						`${this._USER_URL}/${booking.userId}`,
					);

					const activity$: Observable<Activity> = this.http.get<Activity>(
						`${this._ACTIVITY_URL}/${booking.activityId}`,
					);

					return forkJoin<[AuthUser, Activity]>([user$, activity$]).pipe(
						map(([user, activity]) => ({
							...booking,
							user,
							activity,
						})),
					);
				});

				return forkJoin(detailedReservations$);
			}),
		);
	}

	postNewBooking$(newBooking: Booking): Observable<Booking> {
		return this.http.get<Booking[]>(this._BASE_URL).pipe(
			switchMap((bookings: Booking[]) => {
				const nextId =
					bookings.length > 0
						? Number(bookings[bookings.length - 1].id) + 1
						: 1;
				newBooking.id = String(nextId);

				return this.http.post<Booking>(this._BASE_URL, newBooking).pipe(
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
