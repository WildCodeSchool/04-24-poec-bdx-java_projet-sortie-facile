import { Component, Input } from '@angular/core';
import { Activity } from '../../../shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';

@Component({
	selector: 'app-activity-card',
	templateUrl: './activity-card.component.html',
	styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent {
	@Input() activity!: Activity;
	constructor(private activityService: ActivityService) {}


	delete(id: number): void {
		this.activityService.deleteActivity$(id).subscribe(
			() => {
				console.log('Activity deleted successfully.');
				// Vous pouvez ajouter des actions supplémentaires ici si nécessaire
			},
			error => {
				console.error('Error deleting activity:', error);
			}
		);
	}
}