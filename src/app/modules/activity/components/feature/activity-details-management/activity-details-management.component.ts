import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalConfirmReservationComponent } from '@shared/components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { BookingService } from '@shared/services/booking.service';
import { Observable, Subscription, of, switchMap } from 'rxjs';

@Component({
	selector: 'app-activity-details-management',
	templateUrl: './activity-details-management.component.html',
	styleUrl: './activity-details-management.component.scss',
})
export class ActivityDetailsManagementComponent implements OnInit, OnDestroy {
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
						this.categoryTitle$ = of(activity.categoryId.name);
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
