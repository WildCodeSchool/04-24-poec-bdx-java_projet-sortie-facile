import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Region } from '@shared/models/classes/region.class';
import { RegionService } from '@shared/services/region.service';
import { Subscription, map } from 'rxjs';

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
export class SelectRegionComponent
	implements OnInit, OnDestroy, ControlValueAccessor
{
	regions!: Region[];
	selectedRegions!: Region;
	private _subscription: Subscription = new Subscription();

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;

	disabled!: boolean;
	value!: string;

	constructor(private _regionService: RegionService) {}

	ngOnInit() {
		this._subscription.add(
			this._regionService
				.getRegionList$()
				.pipe(map((regions: Region[]) => (this.regions = regions)))
				.subscribe(),
		);
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

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}