import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Region } from '@shared/models/classes/address/region.class';
import { RegionService } from '@shared/services/address/region.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-select-region',
	templateUrl: './select-region.component.html',
	styleUrl: './select-region.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectRegionComponent),
			multi: true,
		},
	],
})
export class SelectRegionComponent implements OnInit, ControlValueAccessor {
	selectedRegionId: number = 1;
	regionList$!: Observable<Region[]>;

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() disabled: boolean = false;

	value!: number;

	constructor(private _regionService: RegionService) {}

	ngOnInit() {
		this.regionList$ = this._regionService.getRegionList$();
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
