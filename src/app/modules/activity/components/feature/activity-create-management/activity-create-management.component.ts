import { NewActivity } from '@activity/models/classes/new-activity.class';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ModalConfirmCreatActivityComponent } from '@shared/components/modal/modal-confirm-creat-activity/modal-confirm-creat-activity.component';
import { City } from '@shared/models/classes/address/city.class';
import { Category } from '@shared/models/classes/category/category.class';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-activity-create-management',
	templateUrl: './activity-create-management.component.html',
	styleUrl: './activity-create-management.component.scss',
})
export class ActivityCreateManagementComponent implements OnDestroy {
	private _subscription: Subscription = new Subscription();

	@ViewChild(ModalConfirmCreatActivityComponent, { static: false })
	modalComponent!: ModalConfirmCreatActivityComponent;

	newActivity: NewActivity = new NewActivity(
		'toto',
		'',
		new City('', ''),
		'',
		0,
		'https://le-periscope.info/wp-content/uploads/2022/07/Capture-decran-2020-03-05-a-00.20.29.png',
		'',
		'',
		0,
		new Category('', '', ''),
		'',
		'',
		true,
	);

	onSubmit(): void {
		// console.log(this.newActivity);
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
