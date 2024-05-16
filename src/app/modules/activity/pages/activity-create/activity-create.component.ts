import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Activity } from '@shared/models/types/activity.type';
import { Router } from '@angular/router';
import { Category } from '@shared/models/types/category.type';
import { ActivityService } from '@shared/services/activity.service';

@Component({
	selector: 'app-activity-create',
	templateUrl: './activity-create.component.html',
	styleUrl: './activity-create.component.scss',
})
export class ActivityCreateComponent {
	newActivity$!: Observable<Activity>;

	constructor(
		private activityService: ActivityService,
		private router: Router,
	) {}

	NewActivity: {
		name: string;
		departement: string;
		activityCity: {
			id: number;
			name: string;
		};
		date: string;
		age: number;
		imgUrl: string;
		link: string;
		description: string;
		nbGuest: number;
		categoryId: Category;
		hour: string;
	} = {
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
	};

	onSubmit(form: NgForm): void {
		this.activityService
			.postNewActivity$(form.value)
			.pipe(
				tap(activity => {
					this.router.navigate(['/activity/details', activity.id]);
				}),
			)
			.subscribe();
	}
}
