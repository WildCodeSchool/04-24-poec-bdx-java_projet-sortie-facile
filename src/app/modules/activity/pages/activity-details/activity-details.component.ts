import { ModalConfirmReservationComponent } from '@shared/components/modal/modal-confirm-reservation/modal-confirm-reservation.component';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivityService } from '@shared/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '@shared/services/booking.service';
import { NgForm } from '@angular/forms';
import { Activity } from '@activity/models/classes/activity.class';
import { Booking } from '@shared/models/classes/booking/booking.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { ActivityListResponseApi } from '@shared/models/classes/activity';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { CategoryService } from '@shared/services/category.service';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrls: ['./activity-details.component.scss'],
})
export class ActivityDetailsComponent implements OnInit, OnDestroy {
	fullActivityRoute = FullActivityRouteEnum;
	activities$!: Observable<ActivityListResponseApi>;
	activity$!: Observable<Activity>;
	categoryTitle$!: Observable<string>;
	userDetails!: UserDetails;
	activityByCategoryList!: Activity[];

	private _subscription: Subscription = new Subscription();

	@Input() myForm: NgForm;
	@Input() imgSrc!: string;

	@ViewChild(ModalConfirmReservationComponent, { static: false })
	modalComponent!: ModalConfirmReservationComponent;

	constructor(
		private activityService: ActivityService,
		private categoryService: CategoryService,
		private reservationService: BookingService,
		private route: ActivatedRoute,
	) {
		this.myForm = {} as NgForm;
	}

	ngOnInit(): void {
		const id: string = this.route.snapshot.paramMap.get('id') as string;
		this.activity$ = this.activityService.getActivityById$(id);
		this.categoryService
			.getActivityListByCategoryId$(id)
			.subscribe((data: Activity[]) => {
				this.activityByCategoryList = data;
			});
	}

	onSubmit(form: NgForm): void {
		this.reservationService.postNewBooking$(form.value).subscribe();
	}

	add(activity: Activity): void {
		const newReservation: Booking = new Booking(
			'',
			this.userDetails.userId,
			activity.id,
		);

		this._subscription.add(
			this.reservationService.postNewBooking$(newReservation).subscribe(),
		);
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
