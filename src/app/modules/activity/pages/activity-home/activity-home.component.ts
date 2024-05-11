/* eslint-disable no-console */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivityService } from '../../../shared/services/activity.service';
import { Observable } from 'rxjs';
import { Activity } from '../../../shared/models/types/activity.type';
import { Router } from '@angular/router';

@Component({
	selector: 'app-activity-home',
	templateUrl: './activity-home.component.html',
	styleUrl: './activity-home.component.scss',
})
export class ActivityHomeComponent {
	newActivity$!: Observable<Activity>;
	constructor(private activityService: ActivityService,	private router: Router ) {}

	formData: {
		name: string;
		date: '';
		hour: '';
		city: '';
		category: '';
		nbGuest: '';
		imgUrl: '';
		link: '';
		description: '';
	} = {
		name: '',
		date: '',
		hour: '',
		city: '',
		category: '',
		nbGuest: '',
		imgUrl: '',
		link: '',
		description: '',
	};
	onSubmit(form: NgForm): void {
		this.activityService.postNewActivity$(form.value).subscribe(
			data => {
				// En cas de succès
				console.log('POST Request is successful ', data);
				// Rediriger vers la page de l'activité créée en utilisant le navigateur
				this.router.navigate(['/activity', data.id]); // Remplacez 'data.id' par l'identifiant de l'activité créée
			},
			error => {
				// En cas d'erreur
				console.log('Error', error);
			},
		);
		console.log('form value : ', form.value);
	}}
