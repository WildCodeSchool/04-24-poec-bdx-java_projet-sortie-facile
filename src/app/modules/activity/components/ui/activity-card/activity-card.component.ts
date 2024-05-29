import { Activity } from '@activity/models/classes/activity.class';
import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
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
	@Output() activityDeleted = new EventEmitter<string>();

	fullActivityRoute = FullActivityRouteEnum;

	private _subscription: Subscription = new Subscription();

	constructor(
		private activityService: ActivityService,
		private confirmationService: ConfirmationService,
		private router: Router,
	) {}

	confirmHideActivity(activityId: string): void {
		this.confirmationService.confirm({
			message: 'Êtes-vous sûr de vouloir masquer cette activité ?',
			header: 'Confirmation',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				this.hideActivity(activityId);
				this.confirmationService.close();
				this.router.navigate([FullActivityRouteEnum.HOME]);
			},
			reject: () => {
				this.confirmationService.close();
			},
		});
	}
	hideActivity(activityId: string): void {
		this.activityService
			.updateActivityVisibility(activityId, false)
			.subscribe(() => {
				this.activityDeleted.emit(activityId);
			});
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
