import { Component, OnInit } from '@angular/core';
import { Activity } from '@shared/models/types/activity.type';
import { Observable, tap } from 'rxjs';
import { ActivityService } from '@shared/services/activity.service';
import { Activities } from '@shared/models/types/activities.type';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '@shared/services/booking/booking.service';
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
	// faire la page de modif
	// update(id: string): void {
	// 	this.activityService.updateActivity$(id).subscribe(
	// 		() => {
	// 			console.log('Activity update successfully.');
	// 			// Vous pouvez ajouter des actions supplémentaires ici si nécessaire
	// 		},
	// 		error => {
	// 			console.error('Error updating activity:', error);
	// 		},
	// 	);
	// }
	add(activity: Activity): void {
		const newReservation: reservation = {
			id: '', // L'id sera généré automatiquement côté serveur
			activityId: activity, // Utilisez l'ID de l'activité
			// Vous devez également définir d'autres propriétés de réservation selon vos besoins
			userId: this.userDetails, // Par exemple, remplacez '123' par l'ID de l'utilisateur réel
			// Autres propriétés de réservation...
		};

		this.reservationService
			.postNewReservation$(newReservation)
			.pipe(
				tap(reservation => {
					console.log('Nouvelle réservation créée:', reservation);
					// Redirection vers la page de détail de la réservation nouvellement créée
					this.router.navigate(['/booking/home']);
				}),
			)
			.subscribe();
	}

	ngOnInit(): void {
		const id: number = Number(this.route.snapshot.paramMap.get('id'));
		this.activity$ = this.activityService.getActivityById$(id);

		// Convertir l'ID de catégorie en chaîne de caractères
		// const categoryId: string = id.toString();

		// Récupérer le titre de la catégorie correspondante à partir de l'ID de catégorie de l'activité
		// this.categoryTitle$ = this.activity$.pipe(
		// 	switchMap(activity => {
		// 		console.log(activity.categoryId.id, 'test');
		// 		return this.activityService.getCategoryTitle$(activity.categoryId.id);
		// 	}),
		// );
	}
}
