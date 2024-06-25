import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '@shared/models/classes/category/category.class';
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

	category$!: Observable<Category>;

	selectedCategoryId: number = 1;
	categoryList$!: Observable<Category[]>;

	disabled!: boolean;
	value!: number;

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.categoryList$ = this.categoryService.getCategoryList$();
	}

	onChanged!: (value: number) => void;
	onTouched!: () => void;

	onInputChange(value: number): void {
		if (this.disabled) {
			return;
		}

		this.onChanged(value);
	}

	writeValue(value: number): void {
		this.value = value;
	}

	registerOnChange(fn: (value: number) => void): void {
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
