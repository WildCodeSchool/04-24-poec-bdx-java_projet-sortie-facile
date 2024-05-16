import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '@shared/models/types/activity.type';
import { ActivityService } from '@shared/services/activity.service';

@Component({
	selector: 'app-activity-list',
	templateUrl: './activity-list.component.html',
	styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent implements OnInit, OnChanges {
	activityList$!: Observable<Activity[]>;
	activity$!: Observable<Activity>;

	constructor(private activityService: ActivityService) {}
	@Input()
	searchedValue: string = '';

	ngOnChanges(): void {
		this.activityList$ = this.activityService.filteredActivityList$(
			this.searchedValue,
		);
	}

	ngOnInit(): void {
		this.activityList$ = this.activityService.getActivityList$();
	}

	getCategoryTitle(categoryId: number): Observable<string> {
		return this.activityService.getCategoryById$(categoryId);
	}
}
