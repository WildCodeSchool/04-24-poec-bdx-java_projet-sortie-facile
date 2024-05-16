import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgForm,
} from '@angular/forms';

@Component({
	selector: 'app-input-date',
	templateUrl: './input-date.component.html',
	styleUrl: './input-date.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputDateComponent),
			multi: true,
		},
	],
})
export class InputDateComponent implements ControlValueAccessor {
	date: Date[] | undefined;
	@Input() type!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() form!: NgForm;
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
