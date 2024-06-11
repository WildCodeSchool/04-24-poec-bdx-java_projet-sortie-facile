import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { City } from '@shared/models/classes/address/city.class';

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
export class SelectCityComponent implements OnInit, ControlValueAccessor {
	cities!: City[];
	selectedCity!: City;

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;

	disabled!: boolean;
	value!: string;

	ngOnInit() {
		this.cities = [
			{ id: '1', name: 'New York' },
			{ id: '2', name: 'Rome' },
			{ id: '3', name: 'London' },
			{ id: '4', name: 'Istanbul' },
			{ id: '5', name: 'Paris' },
		];
	}

	onChanged!: (value: number) => void;
	onTouched!: () => void;

	onInputChange(value: string): void {
		if (this.disabled) {
			return;
		}

		this.onChanged(Number(value));
	}

	writeValue(value: string): void {
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
