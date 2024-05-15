import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '@shared/models/types/activity.type';
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
	@Input() type!: string; // text or email
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() form!: NgForm;

	constructor(
		private activityService: ActivityService,
		private route: ActivatedRoute,

		private router: Router,
	) {}
	formData: Activity = {
		id: '',
		departement: '',
		age: 0,
		name: '',
		date: '',
		hour: '',
		activityCity: { id: 0, name: '' },
		categoryId: { id: 0, title: '' },
		nbGuest: 0,
		description: '',
		imgUrl: '',
		link: '',
	};
	ngOnInit(): void {
		const id: number = Number(this.route.snapshot.paramMap.get('id'));
		this.activity$ = this.activityService.getActivityById$(id);
		this.activity$.subscribe(activity => {
			this.formData = activity;
			console.log(this.formData); // Initialiser formData avec les informations de l'activité
		});
	}
	onSubmit(form: NgForm): void {
		console.log('fvalue', form.value);

		const id: string = this.formData.id; // Récupérer l'ID de l'activité
		const updatedData = form.value; // Récupérer les données mises à jour du formulaire

		this.activityService
			.updateActivity$(id, updatedData)
			.pipe(
				tap(activity => {
					console.log('test', activity);

					// this.router.navigate(['/activity/details', activity.id]);
				}),
			)
			.subscribe();
	}
}
