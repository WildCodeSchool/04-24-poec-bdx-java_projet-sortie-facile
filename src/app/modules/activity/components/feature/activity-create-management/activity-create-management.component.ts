import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity, NewActivity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';
import { AuthService } from '@shared/services/auth.service';
import { Observable, tap } from 'rxjs';

@Component({
	selector: 'app-activity-create-management',
	templateUrl: './activity-create-management.component.html',
	styleUrl: './activity-create-management.component.scss',
})
export class ActivityCreateManagementComponent {
	newActivity$!: Observable<Activity>;

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
		private authService: AuthService,
		private activityService: ActivityService,
		private router: Router,
	) {}

	onSubmit(form: NgForm): void {
		this.activityService
			.postNewActivity$(form.value)
			.pipe(
				tap((activity: Activity) => {
					this.router.navigate(['/activity/details', activity.id]);
				}),
			)
			.subscribe();
	}
}
