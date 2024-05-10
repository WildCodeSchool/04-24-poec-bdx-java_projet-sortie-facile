import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NgForm,
	ValidationErrors,
} from '@angular/forms';

@Component({
	selector: 'app-password-field',
	templateUrl: './password-field.component.html',
	styleUrl: './password-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PasswordFieldComponent),
			multi: true,
		},
	],
})
export class PasswordFieldComponent implements ControlValueAccessor {
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() toggleMask!: string;
	@Input() errorMessage!: string;
	@Input() error!: ValidationErrors | null | undefined;
	@Input() form!: NgForm;
	@Input() required!: boolean;
	@Input() minlength!: number;
	@Input() maxlength!: number;

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
