import { Component, OnInit } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
import { Observable, tap } from 'rxjs';
import { ActivityService } from '@shared/services/activity.service';
import { Activities } from '@shared/models/types/activities.type';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '@shared/services/booking.service';
import { reservation } from '@shared/models/types/reservation.type';
import { UserDetails } from '@shared/models/types/user-details.type';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrl: './activity-details.component.scss',
})
export class ActivityDetailsComponent implements OnInit {
	activities$!: Observable<Activities>;
	activity$!: Observable<Activity>;
	categoryTitle$!: Observable<string>;
	userDetails!: UserDetails;
	constructor(
		private activityService: ActivityService,
		private reservationService: BookingService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	add(activity: Activity): void {
		const newReservation: reservation = {
			id: '',
			activityId: activity,
			userId: this.userDetails,
		};

		this.reservationService
			.postNewReservation$(newReservation)
			.pipe(
				tap(() => {
					this.router.navigate(['/user/home']);
				}),
			)
			.subscribe();
	}

	ngOnInit(): void {
		const id: number = Number(this.route.snapshot.paramMap.get('id'));
		this.activity$ = this.activityService.getActivityById$(id);
	}
}
