import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '@shared/services/activity.service';
import { Subscription, map } from 'rxjs';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { ModalConfirmUpdateActivityComponent } from '@shared/components/modal/modal-confirm-update-activity/modal-confirm-update-activity.component';

@Component({
	selector: 'app-activity-update-management',
	templateUrl: './activity-update-management.component.html',
	styleUrl: './activity-update-management.component.scss',
})
export class ActivityUpdateManagementComponent implements OnInit, OnDestroy {
	@ViewChild(ModalConfirmUpdateActivityComponent, { static: false })
	modalComponent!: ModalConfirmUpdateActivityComponent;

	private _subscription: Subscription = new Subscription();

	formData: Activity = new Activity(
		0,
		'',
		0,
		0,
		0,
		'',
		0,
		'',
		'',
		'',
		0,
		0,
		0,
		true,
	);

	constructor(
		private _activityService: ActivityService,
		private _activatedRoute: ActivatedRoute,
		private _router: Router,
	) {}

	ngOnInit(): void {
		this._activatedRoute.data
			.pipe(
				map(data => data['activityUpdated']),
				map((activity: Activity) => {
					console.log(activity);
					this.formData = activity;
				}),
			)
			.subscribe();
	}

	onSubmit(form: NgForm): void {
		const id: number = this.formData.id;
		const updatedData = form.value;

		this._subscription.add(
			this._activityService
				.updateActivity$(id, { ...updatedData, visible: true })
				.subscribe(),
		);
		this._router.navigate([FullActivityRouteEnum.HOME]);
	}

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
