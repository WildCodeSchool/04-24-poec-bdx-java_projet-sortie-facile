import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '../../../models/types/category.type';

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
	categories!: Category[];

	selectedCategory!: Category;

	@Input() type!: string; // text or email
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;

	disabled!: boolean;
	value!: string;

	ngOnInit() {
		this.categories = [
			{ id: 1, name: 'sport' },
			{ id: 2, name: 'cinema' },
			{ id: 3, name: 'culture' },
			{ id: 4, name: 'plein air' },
			{ id: 5, name: 'soirée' },
		];
	}

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
