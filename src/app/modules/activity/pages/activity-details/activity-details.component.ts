import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivityService } from '@shared/services/activity.service';
import { Activities } from '@shared/models/types/activities.type';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '@shared/services/booking.service';
import { UserDetails } from '@shared/models/types/user-details.type';
import { NgForm } from '@angular/forms';
import { Activity } from '@activity/models/classes/activity.class';
import { Booking } from '@shared/models/classes/booking.class';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrl: './activity-details.component.scss',
})
export class ActivityDetailsComponent implements OnInit, OnDestroy {
	activities$!: Observable<Activities>;
	activity$!: Observable<Activity>;
	categoryTitle$!: Observable<string>;
	userDetails!: UserDetails;
	private _subscription: Subscription = new Subscription();

	@Input() myForm: NgForm;
	@Input() imgSrc!: string;

	constructor(
		private activityService: ActivityService,
		private reservationService: BookingService,
		private route: ActivatedRoute,
	) {
		this.myForm = {} as NgForm;
	}

	ngOnInit(): void {
		const id: string = this.route.snapshot.paramMap.get('id') as string;
		this.activity$ = this.activityService.getActivityById$(id);
	}
	onSubmit(form: NgForm): void {
		this.reservationService.postNewReservation$(form.value).subscribe();
	}

	add(activity: Activity): void {
		const newReservation: Booking = new Booking(
			'',
			this.userDetails.userId,
			activity.id,
		);

		this._subscription.add(
			this.reservationService.postNewReservation$(newReservation).subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
