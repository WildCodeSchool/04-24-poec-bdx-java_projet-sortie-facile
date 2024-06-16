import { Activity } from '@activity/models/classes/activity.class';
import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { ModalConfirmDeleteActivityComponent } from '@shared/components/modal/modal-confirm-delete-activity/modal-confirm-delete-activity.component';
import { City } from '@shared/models/classes/address/city.class';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { CityService } from '@shared/services/address/city.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-activity-card',
	templateUrl: './activity-card.component.html',
	styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent implements OnInit, OnDestroy {
	@Input() activity!: Activity;
	@Input() connectedUser!: AuthUserPrimaryDatas;
	@Output() activityDeleted = new EventEmitter<string>();

	city$!: Observable<City>;

	@ViewChild(ModalConfirmDeleteActivityComponent, { static: false })
	modalComponent!: ModalConfirmDeleteActivityComponent;

	fullActivityRoute = FullActivityRouteEnum;

	private _subscription: Subscription = new Subscription();

	constructor(private _cityService: CityService) {}

	ngOnInit(): void {
		this.city$ = this._cityService.getCityById$(this.activity.id);
	}

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
