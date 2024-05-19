import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@shared/models/classes/category.class';
import { City } from '@shared/models/classes/city.class';
import { ActivityService } from '@shared/services/activity.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-update-activity',
	templateUrl: './update-activity.component.html',
	styleUrl: './update-activity.component.scss',
})
export class UpdateActivityComponent implements OnInit, OnDestroy {
	updateActivity$!: Observable<Activity>;
	activity$!: Observable<Activity>;
	private _subscription: Subscription = new Subscription();

	@Input() type!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() form!: NgForm;

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
		const id: number = Number(this.route.snapshot.paramMap.get('id'));
		this.activity$ = this.activityService.getActivityById$(id);
		this.activity$.subscribe(activity => {
			this.formData = activity;
		});
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
