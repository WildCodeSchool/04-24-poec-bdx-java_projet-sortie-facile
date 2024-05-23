import { Component } from '@angular/core';
import { Category } from '@shared/models/classes/category.class';

@Component({
	selector: 'app-activity-list',
	templateUrl: './activity-list.component.html',
	styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent {
	searchedValue: string = '';

	selectedCategoryId!: Category;

	onSearch(value: string): void {
		this.searchedValue = value;
	}
}
