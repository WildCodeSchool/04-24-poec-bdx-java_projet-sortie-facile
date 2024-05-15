import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '@shared/models/types/activity.type';
import { Category } from '@shared/models/types/category.type';
import { ActivityService } from '@shared/services/activity.service';
import { Observable, tap } from 'rxjs';

@Component({
	selector: 'app-update-activity',
	templateUrl: './update-activity.component.html',
	styleUrl: './update-activity.component.scss',
})
export class UpdateActivityComponent implements OnInit {
	updateActivity$!: Observable<Activity>;
	activity$!: Observable<Activity>;

	constructor(
		private activityService: ActivityService,
		private route: ActivatedRoute,

		private router: Router,
	) {}

	formData: {
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
			id: 0,
			title: '',
		},
		hour: '',
	};
	ngOnInit(): void {
		const id: number = Number(this.route.snapshot.paramMap.get('id'));
		this.activity$ = this.activityService.getActivityById$(id);
	}
	onSubmit(form: NgForm): void {
		console.log('fvalue', form.value);

		this.activityService
			.updateActivity$(form.value)
			.pipe(
				tap(activity => {
					console.log('test', activity);

					// this.router.navigate(['/activity/details', activity.id]);
				}),
			)
			.subscribe();
	}
}
