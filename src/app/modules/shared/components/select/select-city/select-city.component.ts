import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { City } from '@shared/models/classes/address/city.class';
import { CityService } from '@shared/services/address/city.service';
import { Observable } from 'rxjs';

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
	selectedCityId: number = 1;
	cityList$!: Observable<City[]>;

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;

	disabled!: boolean;
	value!: number;

	constructor(private _cityService: CityService) {}

	ngOnInit() {
		this.cityList$ = this._cityService.getCityList$();
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
