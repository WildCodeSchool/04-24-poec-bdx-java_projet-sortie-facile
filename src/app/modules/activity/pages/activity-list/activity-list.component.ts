import { Component } from '@angular/core';
import { Category } from '@shared/models/classes/category/category.class';
import { Department } from '@shared/models/classes/address/department.class';

@Component({
	selector: 'app-activity-list',
	templateUrl: './activity-list.component.html',
	styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent {
	searchedValue: string = '';
	showResponsiveFilters: boolean = false;
	resetFilter: boolean = false;

	selectedCategoryId!: Category;
	selectedDepartments!: Department;

	onSearch(value: string): void {
		this.searchedValue = value;
	}

	onShowFilters(args: boolean): void {
		this.showResponsiveFilters = args;
	}

	onResetFilters(): void {
		this.searchedValue = '';
	}
}
