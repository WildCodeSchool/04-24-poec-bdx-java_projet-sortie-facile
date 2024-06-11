import { Activity } from '@activity/models/classes/activity.class';
import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	ViewChild,
} from '@angular/core';
import { ModalConfirmDeleteActivityComponent } from '@shared/components/modal/modal-confirm-delete-activity/modal-confirm-delete-activity.component';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-activity-card',
	templateUrl: './activity-card.component.html',
	styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent implements OnDestroy {
	@Input() activity!: Activity;
	@Input() connectedUser!: AuthUserPrimaryDatas;
	@Output() activityDeleted = new EventEmitter<number>();

	@ViewChild(ModalConfirmDeleteActivityComponent, { static: false })
	modalComponent!: ModalConfirmDeleteActivityComponent;

	fullActivityRoute = FullActivityRouteEnum;

	private _subscription: Subscription = new Subscription();

	hideActivity(activityId: number): void {
		this.activityDeleted.emit(activityId);
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	onActivityDeleted(activityId: number): void {
		this.hideActivity(activityId);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
