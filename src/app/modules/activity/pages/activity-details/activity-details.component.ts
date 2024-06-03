import { ModalConfirmReservationComponent } from '@shared/components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, of, switchMap } from 'rxjs';
import { ActivityService } from '@shared/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '@shared/services/booking.service';
import { Activity } from '@activity/models/classes/activity.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { AuthService } from '@shared/services/auth.service';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrls: ['./activity-details.component.scss'],
})
export class ActivityDetailsComponent implements OnInit, OnDestroy {
	fullActivityRoute = FullActivityRouteEnum;
	activity$!: Observable<Activity>;
	categoryTitle$!: Observable<string>;
	userDetails!: UserDetails;
	hasBooking!: boolean;
	connectedUser!: AuthUserPrimaryDatas;
	suggestList$!: Observable<Activity[]>;
	private _subscription: Subscription = new Subscription();

	@Input() imgSrc!: string;

	@ViewChild(ModalConfirmReservationComponent, { static: false })
	modalComponent!: ModalConfirmReservationComponent;

	constructor(
		private activityService: ActivityService,
		private bookingService: BookingService,
		private route: ActivatedRoute,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getConnectedUserData();

		const activityId: string = this.route.snapshot.paramMap.get('id') as string;
		this.activity$ = this.activityService.getActivityById$(activityId);

		this._subscription.add(
			this.activity$
				.pipe(
					switchMap(activity => {
						this.categoryTitle$ = of(activity.categoryId.name); // Correctly get the category name
						return this.activityService.filteredActivityListByCategory$(
							activity.categoryId,
						);
					}),
				)
				.subscribe(activities => (this.suggestList$ = of(activities))),
		);

		this._subscription.add(
			this.bookingService
				.checkIfConnectedUserHasBookingActivity$(
					this.connectedUser.userDetailsId,
					activityId,
				)
				.subscribe(hasBooking => (this.hasBooking = hasBooking)),
		);
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
