import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@shared/models/classes/category/category.class';
import { City } from '@shared/models/classes/address/city.class';
import { ActivityService } from '@shared/services/activity.service';
import { Subscription, map } from 'rxjs';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';

@Component({
	selector: 'app-activity-update-management',
	templateUrl: './activity-update-management.component.html',
	styleUrl: './activity-update-management.component.scss',
})
export class ActivityUpdateManagementComponent implements OnInit, OnDestroy {
	private _subscription: Subscription = new Subscription();

	constructor(
		private _activityService: ActivityService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
	) {}

	formData: Activity = new Activity(
		'',
		'',
		'',
		new City('', ''),
		'',
		0,
		'',
		'',
		'',
		0,
		new Category('0', ''),
		'',
		'',
		true,
	);

	ngOnInit(): void {
		this._activatedRoute.data
			.pipe(
				map(data => data['activityUpdated']),
				map((activity: Activity) => (this.formData = activity)),
			)
			.subscribe();
	}

	onSubmit(form: NgForm): void {
		const id: string = this.formData.id;
		const updatedData = form.value;

		this._subscription.add(
			this._activityService.updateActivity$(id, updatedData).subscribe(),
		);
		this._router.navigate([FullActivityRouteEnum.HOME]);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
