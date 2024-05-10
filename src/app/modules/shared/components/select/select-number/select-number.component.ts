import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-select-number',
	templateUrl: './select-number.component.html',
	styleUrl: './select-number.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectNumberComponent),
			multi: true,
		},
	],
})
export class SelectNumberComponent implements ControlValueAccessor {
	value1: number = 50;
	@Input() type!: string; // text or email
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;

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
