import { NewActivity } from '@activity/models/classes/new-activity.class';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '@shared/models/classes/category.class';
import { City } from '@shared/models/classes/city.class';
import { Activity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-activity-create-management',
	templateUrl: './activity-create-management.component.html',
	styleUrl: './activity-create-management.component.scss',
})
export class ActivityCreateManagementComponent implements OnDestroy {
	private _subscription: Subscription = new Subscription();

	constructor(private activityService: ActivityService) {}

	newActivity: NewActivity = new NewActivity(
		'toto',
		'',
		new City(1, ''),
		'',
		0,
		'',
		'',
		'',
		0,
		new Category('1', ''),
		'',
		'1',
	);

	onSubmit(form: NgForm): void {
		this._subscription.add(
			this.activityService.postNewActivity$(form.value).subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
