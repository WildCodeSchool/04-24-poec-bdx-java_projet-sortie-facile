import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, ValidationErrors } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/models/classes/form-input-control-value-accessor.class';

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
export class PasswordFieldComponent extends FormInputControlValueAccessor {
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
	@Input() inputInfo!: string;
}
