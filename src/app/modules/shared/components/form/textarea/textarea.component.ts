import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, ValidationErrors } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/models/classes/form-input-control-value-accessor.class';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrl: './textarea.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true,
		},
	],
})
export class TextareaComponent extends FormInputControlValueAccessor {
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() cols!: number;
	@Input() rows!: number;
	@Input() errorMessage!: string;
	@Input() error!: ValidationErrors | null | undefined;
	@Input() form!: NgForm;
	@Input() required!: boolean;
	@Input() minlength!: number;
}
