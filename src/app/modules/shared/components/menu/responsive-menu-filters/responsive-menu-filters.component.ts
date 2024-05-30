import { Component, Input } from '@angular/core';
import { Department } from '@shared/models/classes/address/department.class';
import { Category } from '@shared/models/classes/category/category.class';

@Component({
	selector: 'app-responsive-menu-filters',
	templateUrl: './responsive-menu-filters.component.html',
	styleUrl: './responsive-menu-filters.component.scss',
})
export class ResponsiveMenuFiltersComponent {
	@Input() searchedValue: string = '';

	@Input() selectedCategoryId!: Category;
	@Input() selectedDepartments!: Department;

	visible: boolean = false;

	showDialog() {
		this.visible = true;
	}

	onSearch(value: string): void {
		this.searchedValue = value;
	}
}
