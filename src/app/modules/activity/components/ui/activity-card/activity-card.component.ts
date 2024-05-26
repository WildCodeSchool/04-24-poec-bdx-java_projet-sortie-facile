import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { ActivityService } from '@shared/services/activity.service';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-activity-card',
	templateUrl: './activity-card.component.html',
	styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent implements OnDestroy {
	@Input() activity!: Activity;
	@Input() connectedUser!: AuthUserPrimaryDatas;

	private _subscription: Subscription = new Subscription();

	constructor(
		private activityService: ActivityService,
		private confirmationService: ConfirmationService,
		private router: Router,
	) {}

	// delete(id: string): void {
	// 	this._subscription.add(
	// 		this.activityService.deleteActivity$(id).subscribe(),
	// 	);
	// }
	confirmHideActivity(activityId: string): void {
		this.confirmationService.confirm({
			message: 'Êtes-vous sûr de vouloir masquer cette activité ?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.hideActivity(activityId);
				this.confirmationService.close();
				this.router.navigate(['/activity/home']);
			},
			reject: () => {
				this.confirmationService.close();
			},
		});
	}
	hideActivity(activityId: string): void {
		this.activityService.updateActivityVisibility(activityId, false).subscribe({
			next: () => {
				console.log('Activity hidden successfully');
				// Actualisez ou mettez à jour la liste des activités après modification si nécessaire
			},
			error: err => console.error('Error hiding activity:', err),
		});
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
