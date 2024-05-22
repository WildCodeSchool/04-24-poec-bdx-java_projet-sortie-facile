import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '@models/types/category.type';
import { ActivityService } from '@shared/services/activity.service';
import { CategoryService } from '@shared/services/category.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-select-category',
	templateUrl: './select-category.component.html',
	styleUrl: './select-category.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectCategoryComponent),
			multi: true,
		},
	],
})
export class SelectCategoryComponent implements OnInit, ControlValueAccessor {
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() isMultiple!: boolean;

	categories!: Category[];
	category$!: Observable<Category>;
	activityCategoryList$!: Observable<Category[]>;
	selectedCategory!: Category;

	constructor(
		private activityService: ActivityService,
		private categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		this.activityCategoryList$ = this.categoryService.getCategoryList$();
	}

	disabled!: boolean;
	value!: string;

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	onInputChange(value: string): void {
		if (this.disabled) {
			return;
		}

		this.onChanged(value);
	}

	writeValue(value: string): void {
		this.value = value;
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChanged = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	markAsTouched(): void {
		this.onTouched();
	}
}
