import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
import { Observable, Subscription } from 'rxjs';
import { ActivityService } from '@shared/services/activity.service';
import { Activities } from '@shared/models/types/activities.type';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '@shared/services/booking.service';
import { reservation } from '@shared/models/types/reservation.type';
import { UserDetails } from '@shared/models/types/user-details.type';
import { NgForm } from '@angular/forms';

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

	constructor(
		private activityService: ActivityService,
		private reservationService: BookingService,
		private route: ActivatedRoute,
	) {
		this.myForm = {} as NgForm;
	}

	ngOnInit(): void {
		const id: number = Number(this.route.snapshot.paramMap.get('id'));
		this.activity$ = this.activityService.getActivityById$(id);
	}
	onSubmit(form: NgForm): void {
		this.reservationService.postNewReservation$(form.value).subscribe();
	}

	add(activity: Activity): void {
		const newReservation: reservation = {
			id: '',
			activityId: activity,
			userId: this.userDetails,
		};

		this._subscription.add(
			this.reservationService.postNewReservation$(newReservation).subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
