import { Activity } from '@activity/models/classes/activity.class';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@shared/models/classes/category.class';
import { City } from '@shared/models/classes/city.class';
import { ActivityService } from '@shared/services/activity.service';
import { Observable, Subscription, map } from 'rxjs';

@Component({
	selector: 'app-activity-update-management',
	templateUrl: './activity-update-management.component.html',
	styleUrl: './activity-update-management.component.scss',
})
export class ActivityUpdateManagementComponent implements OnInit, OnDestroy {
	private _subscription: Subscription = new Subscription();

	constructor(
		private activityService: ActivityService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	formData: Activity = new Activity(
		'',
		'',
		'',
		new City(0, ''),
		'',
		0,
		'',
		'',
		'',
		0,
		new Category('0', ''),
		'',
		'',
	);

	ngOnInit(): void {
		const id: string = this.route.snapshot.paramMap.get('id') as string;
		this.activityService
			.getActivityById$(id)
			.pipe(map((activity: Activity) => (this.formData = activity)))
			.subscribe();
	}

	onSubmit(form: NgForm): void {
		const id: string = this.formData.id;
		const updatedData = form.value;

		this._subscription.add(
			this.activityService.updateActivity$(id, updatedData).subscribe(),
		);
		this.router.navigate(['/activity/home']);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
