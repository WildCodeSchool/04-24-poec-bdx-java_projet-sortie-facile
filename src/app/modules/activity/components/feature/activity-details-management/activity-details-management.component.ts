import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmReservationComponent } from '@shared/components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { City } from '@shared/models/classes/address/city.class';
import { Department } from '@shared/models/classes/address/department.class';
import { Region } from '@shared/models/classes/address/region.class';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import {
	FullActivityRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';
import { ActivityService } from '@shared/services/activity.service';
import { CityService } from '@shared/services/address/city.service';
import { DepartmentService } from '@shared/services/address/department.service';
import { RegionService } from '@shared/services/address/region.service';
import { AuthService } from '@shared/services/auth.service';
import { BookingService } from '@shared/services/booking.service';
import { TokenService } from '@shared/services/token.service';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-activity-details-management',
	templateUrl: './activity-details-management.component.html',
	styleUrl: './activity-details-management.component.scss',
})
export class ActivityDetailsManagementComponent implements OnInit, OnDestroy {
	@Input() imgSrc!: string;

	@ViewChild(ModalConfirmReservationComponent, { static: false })
	modalComponent!: ModalConfirmReservationComponent;

	activity$!: Observable<Activity>;
	categoryTitle$!: Observable<string>;
	userDetails!: UserDetails;
	hasBooking!: boolean;
	suggestList$!: Observable<Activity[]>;

	connectedUser!: AuthUserResponse;

	city$!: Observable<City>;
	region$!: Observable<Region>;
	department$!: Observable<Department>;
	address$!: Observable<string>;

	fullActivityRoute = FullActivityRouteEnum;
	fullUserRouteEnum = FullUserRouteEnum;

	private _subscription: Subscription = new Subscription();

	constructor(
		private activityService: ActivityService,
		private bookingService: BookingService,
		private route: ActivatedRoute,
		private authService: AuthService,
		private _router: Router,
		private _regionService: RegionService,
		private _departmentService: DepartmentService,
		private _cityService: CityService,
		private _tokenService: TokenService,
	) {}

	ngOnInit(): void {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: any) => {
				this.connectedUser = connectedUser;
			});

		this._subscription.add(
			this.route.paramMap
				.pipe(
					switchMap(paramMap => {
						const activityId: string = paramMap.get('id') as string;
						this.activity$ = this.activityService.getActivityById$(activityId);

						return this.activity$.pipe(
							switchMap((activity: Activity) => {
								this.region$ = this._regionService.getRegionById$(
									activity.regionId,
								);

								this.department$ = this._departmentService.getDepartmentById$(
									activity.departmentId,
								);

								this.city$ = this._cityService.getCityById$(activity.cityId);

								this.address$ = combineLatest([
									this.region$,
									this.department$,
									this.city$,
								]).pipe(
									map(([region, department, city]) => {
										return `${city.name} (${department.name}, ${region.name})`;
									}),
								);

								return of(activity);
							}),
							switchMap(activity => {
								// 	this.categoryTitle$ = of(activity.categoryId.name);

								// 	this.suggestList$ =
								// 		this.activityService.filteredActivityListByCategory$(
								// 			activity.categoryId,
								// 		);

								return this.bookingService.checkIfConnectedUserHasBookingActivity$(
									this.connectedUser.id,
									Number(activityId),
								);
							}),
						);
					}),
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
