import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity, NewActivity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-activity-create-management',
	templateUrl: './activity-create-management.component.html',
	styleUrl: './activity-create-management.component.scss',
})
export class ActivityCreateManagementComponent implements OnDestroy {
	newActivity$!: Observable<Activity>;
	private _subscription: Subscription = new Subscription();

	newActivity: NewActivity = {
		name: 'toto',
		departement: '',
		activityCity: {
			id: 0,
			name: '',
		},
		date: '',
		age: 0,
		imgUrl: '',
		link: '',
		description: '',
		nbGuest: 0,
		categoryId: {
			id: '0',
			title: '',
		},
		hour: '',
		userId: '1',
	};

	constructor(
		private activityService: ActivityService,
		private router: Router,
	) {}

	onSubmit(form: NgForm): void {
		this._subscription.add(
			this.activityService
				.postNewActivity$(form.value)
				.pipe(
					tap((activity: Activity) => {
						this.router.navigate(['/activity/details', activity.id]);
					}),
				)
				.subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
