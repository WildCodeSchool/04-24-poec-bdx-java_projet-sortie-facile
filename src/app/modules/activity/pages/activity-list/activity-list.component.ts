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

	selectedCategoryId!: Category;
	selectedDepartments!: Department;
	onSearch(value: string): void {
		this.searchedValue = value;
	}
}
