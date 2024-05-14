import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { City } from '@models/types/city.type';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-select-city',
	templateUrl: './select-city.component.html',
	styleUrl: './select-city.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectCityComponent),
			multi: true,
		},
	],
})
export class SelectCityComponent implements OnInit {
	cities!: City[];

	selectedCity!: City;

	@Input() type!: string; // text or email
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;

	disabled!: boolean;
	value!: string;

	ngOnInit() {
		this.cities = [
			{ id: 1, name: 'New York' },
			{ id: 2, name: 'Rome' },
			{ id: 3, name: 'London' },
			{ id: 4, name: 'Istanbul' },
			{ id: 5, name: 'Paris' },
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
