import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalConfirmReservationComponent } from '@shared/components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { City } from '@shared/models/classes/address/city.class';
import { Department } from '@shared/models/classes/address/department.class';
import { Region } from '@shared/models/classes/address/region.class';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
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
	styleUrls: ['./activity-details-management.component.scss'],
})
export class ActivityDetailsManagementComponent implements OnInit, OnDestroy {
	@Input() imgSrc!: string;

	@ViewChild(ModalConfirmReservationComponent, { static: false })
	modalComponent!: ModalConfirmReservationComponent;

	activity$!: Observable<Activity>;
	categoryTitle$!: Observable<string>;
	UserProfile!: UserProfile;
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
	private currentActivityIndex = 0;
	private activities: Activity[] = [];

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
			this.route.paramMap.subscribe(paramMap => {
				const activityId: string = paramMap.get('id') as string;
				this.loadActivity(activityId);
				this.loadActivities();
			}),
		);
	}

	loadActivity(activityId: string): void {
		this.activity$ = this.activityService.getActivityById$(activityId).pipe(
			switchMap((activity: Activity) => {
				this.region$ = this._regionService.getRegionById$(activity.regionId);
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
		);

		this.activity$.subscribe((activity: Activity) => {
			this.bookingService
				.checkIfConnectedUserHasBookingActivity$(
					this.connectedUser.id,
					Number(activityId),
				)
				.subscribe(hasBooking => (this.hasBooking = hasBooking));
		});
	}

	loadActivities(): void {
		this.activityService.getActivityList$().subscribe(activities => {
			this.activities = activities;
			this.setCurrentActivityIndex();
		});
	}

	setCurrentActivityIndex(): void {
		this.route.paramMap.subscribe(paramMap => {
			const activityId: string = paramMap.get('id') as string;
			const numericActivityId = Number(activityId); // Convert activityId to a number
			this.currentActivityIndex = this.activities.findIndex(
				activity => activity.id === numericActivityId,
			);
		});
	}

	changePage(offset: number): void {
		const newIndex = this.currentActivityIndex + offset;
		if (newIndex >= 0 && newIndex < this.activities.length) {
			this._router.navigate([
				this.fullActivityRoute.DETAILS,
				this.activities[newIndex].id,
			]);
		}
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
