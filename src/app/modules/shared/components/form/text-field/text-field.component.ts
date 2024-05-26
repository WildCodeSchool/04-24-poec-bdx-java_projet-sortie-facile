import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, ValidationErrors } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/models/classes/utils/form-input-control-value-accessor.class';

@Component({
	selector: 'app-text-field',
	templateUrl: './text-field.component.html',
	styleUrl: './text-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextFieldComponent),
			multi: true,
		},
	],
})
export class TextFieldComponent extends FormInputControlValueAccessor {
	@Input() type!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() fieldName!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() errorMessage!: string;
	@Input() error!: ValidationErrors | null | undefined;
	@Input() form!: NgForm;
	@Input() required!: boolean;
	@Input() minlength!: number;
	@Input() maxlength!: number;
}
