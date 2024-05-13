/* eslint-disable no-console */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivityService } from '../../../shared/services/activity.service';
import { Observable, map, tap } from 'rxjs';
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
		activityCity: {
			"id": number,
        "name": string
		};
		categoryId: "";
		nbGuest: '';
		imgUrl: '';
		link: '';
		description: '';
	} = {
		name: '',
		date: '',
		hour: '',
		activityCity: {id:0,name:""},
		categoryId: "",
		nbGuest: '',
		imgUrl: '',
		link: '',
		description: '',
	};
	onSubmit(form: NgForm): void {
		this.activityService.postNewActivity$(form.value).pipe(tap(activity=>this.router.navigate(['/activity/details', activity.id]))).subscribe()
	 }} // Remplacez 'data.id' par l'identifiant de l'activité créée

	// 		data => 
	// 			// En cas de succès
	// 			console.log('POST Request is successful ', data);
	// 			// Rediriger vers la page de l'activité créée en utilisant le navigateur
	// 			this.router.navigate(['/activity/details', data.id]); // Remplacez 'data.id' par l'identifiant de l'activité créée
	// 		},
	// 		error => {
	// 			// En cas d'erreur
	// 			console.log('Error', error);
	// 		},
	// 	);
	// 	console.log('form value : ', form.value);
	// }}
