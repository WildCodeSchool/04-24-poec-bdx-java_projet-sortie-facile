import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmReservationComponent } from '@shared/components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import {
	FullActivityRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { BookingService } from '@shared/services/booking.service';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-activity-details-management',
	templateUrl: './activity-details-management.component.html',
	styleUrl: './activity-details-management.component.scss',
})
export class ActivityDetailsManagementComponent {
	// fullActivityRoute = FullActivityRouteEnum;
	// activity$!: Observable<Activity>;
	// categoryTitle$!: Observable<string>;
	// userDetails!: UserDetails;
	// hasBooking!: boolean;
	// connectedUser!: AuthUserPrimaryDatas;
	// suggestList$!: Observable<Activity[]>;
	// fullUserRouteEnum = FullUserRouteEnum;
	// private _subscription: Subscription = new Subscription();
	// @Input() imgSrc!: string;
	// @ViewChild(ModalConfirmReservationComponent, { static: false })
	// modalComponent!: ModalConfirmReservationComponent;
	// constructor(
	// 	private activityService: ActivityService,
	// 	private bookingService: BookingService,
	// 	private route: ActivatedRoute,
	// 	private authService: AuthService,
	// 	private _router: Router,
	// ) {}
	// ngOnInit(): void {
	// 	this.connectedUser = this.authService.getConnectedUserData();
	// 	this._subscription.add(
	// 		this.route.paramMap
	// 			.pipe(
	// 				switchMap(paramMap => {
	// 					const activityId: string = paramMap.get('id') as string;
	// 					this.activity$ = this.activityService.getActivityById$(activityId);
	// 					return this.activity$.pipe(
	// 						switchMap(activity => {
	// 							this.categoryTitle$ = of(activity.categoryId.name);
	// 							this.suggestList$ =
	// 								this.activityService.filteredActivityListByCategory$(
	// 									activity.categoryId,
	// 								);
	// 							return this.bookingService.checkIfConnectedUserHasBookingActivity$(
	// 								this.connectedUser.userDetailsId,
	// 								activityId,
	// 							);
	// 						}),
	// 					);
	// 				}),
	// 			)
	// 			.subscribe(hasBooking => (this.hasBooking = hasBooking)),
	// 	);
	// }
	// onModal(): void {
	// 	this.modalComponent.onSubmit();
	// }
	// ngOnDestroy(): void {
	// 	this._subscription.unsubscribe();
	// }
}
