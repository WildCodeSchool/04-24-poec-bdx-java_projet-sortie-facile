import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, forkJoin, map, mergeMap, tap } from 'rxjs';
import { Booking } from '@shared/models/classes/booking/booking.class';
import { Activity } from '@activity/models/classes/activity.class';
import { AuthUser } from '@shared/models/classes/auth-user/auth-user.class';
import { BookingListResponseApi } from '@shared/models/classes/booking';
import { BookingUserActivity } from '@shared/models/classes/booking/booking-user-activity.class';
import { FullUserRouteEnum } from '@shared/models/enums/routes/full-routes';

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

	// onSubmit(form: NgForm): void {
	// 	this.postNewBooking$(form.value).subscribe();
	// }

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

	postNewBooking$(userId: string, activityId: string): Observable<Booking> {
		return this.http.post<Booking>(this._BASE_URL, { userId, activityId }).pipe(
			tap(() => {
				this.router.navigate([FullUserRouteEnum.ACTIVITY]);
			}),

			catchError(error => {
				throw error;
			}),
		);
	}

	checkIfConnectedUserHasBookingActivity$(
		userDetailsId: string,
		activityId: string,
	): Observable<boolean> {
		return this.http.get<Booking[]>(this._BASE_URL).pipe(
			map((bookings: Booking[]) => {
				return bookings.some(
					(booking: Booking) =>
						booking.userId === userDetailsId &&
						booking.activityId === activityId,
				);
			}),
		);
	}
}
