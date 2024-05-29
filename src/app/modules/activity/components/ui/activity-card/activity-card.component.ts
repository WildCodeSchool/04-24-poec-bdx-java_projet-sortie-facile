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
	@Output() activityDeleted = new EventEmitter<string>();
	@ViewChild(ModalConfirmDeleteActivityComponent, { static: false })
	fullActivityRoute = FullActivityRouteEnum;
	modalComponent!: ModalConfirmDeleteActivityComponent;

	private _subscription: Subscription = new Subscription();

	hideActivity(activityId: string): void {
		this.activityDeleted.emit(activityId);
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	onActivityDeleted(activityId: string): void {
		this.hideActivity(activityId);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
