import { Component } from '@angular/core';

@Component({
	selector: 'app-activity-list',
	templateUrl: './activity-list.component.html',
	styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent {
	searchedValue: string = '';

	onSearch(event: string) {
		this.searchedValue = event;
	}
}
