import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-update-activity',
	templateUrl: './update-activity.component.html',
	styleUrl: './update-activity.component.scss',
})
export class UpdateActivityComponent implements OnInit {
	updateActivity$!: Observable<Activity>;
	activity$!: Observable<Activity>;
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

	formData: Activity = {
		id: '',
		departement: '',
		age: 0,
		name: '',
		date: '',
		hour: '',
		activityCity: { id: 0, name: '' },
		categoryId: { id: '0', title: '' },
		nbGuest: 0,
		description: '',
		imgUrl: '',
		link: '',
		userId: '',
	};

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

		this.activityService.updateActivity$(id, updatedData).subscribe();
		this.router.navigate(['/activity/details/', id]);
	}
}
