import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
import {
	FullBookingRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { environment } from 'environments/environment';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class BookingService {
	private readonly _BASE_URL = `${environment.apiUrl}/booking`;
	private readonly _USER_URL = `${environment.apiUrl}/profile`;
	private readonly _ACTIVITY_URL = `${environment.apiUrl}/activity`;

	private navItems: MenuItem[] = [
		{
			id: '1',
			label: 'Calendrier',
			command: () => {
				this._router.navigateByUrl(FullBookingRouteEnum.DATA);
			},
			state: { path: FullBookingRouteEnum.DATA },
		},
		{
			id: '2',
			label: 'Data',
			command: () => {
				this._router.navigateByUrl(FullBookingRouteEnum.HOME);
			},
			state: { path: FullBookingRouteEnum.HOME },
		},
	];

	private layoutItems: LayoutLink[] = [
		{
			label: 'Calendrier',
			path: FullBookingRouteEnum.DATA,
			active: false,
		},
		{
			label: 'Data',
			path: FullBookingRouteEnum.HOME,
			active: false,
		},
	];

	constructor(
		private http: HttpClient,
		private _router: Router,
	) {}

	getBookingList$(): Observable<BookingUserActivity[]> {
		return this.http.get<Booking[]>(`${this._BASE_URL}/all`).pipe(
			mergeMap((bookings: BookingListResponseApi) => {
				const detailedReservations$ = bookings.map((booking: Booking) => {
					const user$: Observable<AuthUser> = this.http.get<AuthUser>(
						`${this._USER_URL}/${booking.profileId}`,
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

	getBookingListByUser$(profileId: number): Observable<BookingUserActivity[]> {
		return this.getBookingList$().pipe(
			map((bookingList: BookingUserActivity[]) =>
				bookingList.filter(
					(booking: BookingUserActivity) => booking.profileId === profileId,
				),
			),
		);
	}

	getBookingByUserAndActivity$(
		profileId: number,
		activityId: number,
	): Observable<BookingUserActivity> {
		return this.getBookingList$().pipe(
			map(
				(bookingList: BookingUserActivity[]) =>
					bookingList.find(
						(booking: BookingUserActivity) =>
							booking.profileId === profileId &&
							booking.activityId === activityId,
					) as BookingUserActivity,
			),
		);
	}

	postNewBooking$(profileId: number, activityId: number): Observable<Booking> {
		return this.http
			.post<Booking>(
				`${this._BASE_URL}/add/activity/${activityId}/profile/${profileId}`,
				{
					createdAt: '2024/02/02',
				},
			)
			.pipe(
				tap(() => {
					this._router.navigate([FullUserRouteEnum.ACTIVITY]);
				}),
				catchError(error => {
					throw error;
				}),
			);
	}

	// todo back :
	// GET Booking By profileId And activityId
	// DELETE by bookingId

	deleteBookingById$(
		profileId: number,
		activityId: number,
	): Observable<Booking> {
		return this.getBookingByUserAndActivity$(profileId, activityId).pipe(
			switchMap((booking: BookingUserActivity) =>
				this.http
					.delete<Booking>(`${this._BASE_URL}/delete/${booking.id}`)
					.pipe(
						tap(() => {
							this._router.navigate([FullUserRouteEnum.ACTIVITY]);
						}),
						catchError(error => {
							throw error;
						}),
					),
			),
		);
	}

	checkIfConnectedUserHasBookingActivity$(
		profileId: number,
		activityId: number,
	): Observable<boolean> {
		return this.http.get<Booking[]>(`${this._BASE_URL}/all`).pipe(
			map((bookings: Booking[]) => {
				return bookings.some(
					(booking: Booking) =>
						booking.profileId === profileId &&
						booking.activityId === activityId,
				);
			}),
		);
	}

	public getNavItems() {
		return this.navItems;
	}

	public getLayoutItems() {
		return this.layoutItems;
	}
}
