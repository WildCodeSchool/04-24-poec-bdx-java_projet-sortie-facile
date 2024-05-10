import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../../shared/models/types/activity.type';
import { ActivityService } from '../../../shared/services/activity.service';

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

	ngOnChanges(changes: SimpleChanges): void {
		// si searchedValue est vide, ma méthode "filter" renvoie TOUS les burgers
		// sinon, elle renvera les burgers filtrés
		this.activityList$ = this.activityService.filteredActivityList$(
			this.searchedValue,
		);

		// eslint-disable-next-line no-console
		console.log(changes);
	}

	ngOnInit(): void {
		this.activityList$ = this.activityService.getActivityList$();

		// eslint-disable-next-line no-console
		console.log(this.activityList$);
	}

	getCategoryTitle(categoryId: number): Observable<string> {
		return this.activityService.getCategoryById$(categoryId);
	}
}
