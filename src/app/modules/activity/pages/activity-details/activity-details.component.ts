import { Component, OnInit } from '@angular/core';
import { Activity } from '../../../shared/models/types/activity.type';
import { Observable, map, switchMap } from 'rxjs';
import { ActivityService } from '../../../shared/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activities } from '../../../shared/models/types/activities.type';
import { Category } from '@shared/models/types/category.type';

@Component({
	selector: 'app-activity-details',
	templateUrl: './activity-details.component.html',
	styleUrl: './activity-details.component.scss',
})
export class ActivityDetailsComponent implements OnInit {
	activities$!: Observable<Activities>;
	activity$!: Observable<Activity>;
	categoryTitle$!: Observable<string>;
	constructor(
		private activityService: ActivityService,
		private route: ActivatedRoute,
	) {}
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
