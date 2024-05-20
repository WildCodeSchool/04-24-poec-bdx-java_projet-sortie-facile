import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, ValidationErrors } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/models/classes/form-input-control-value-accessor.class';

@Component({
	selector: 'app-mask-field',
	templateUrl: './mask-field.component.html',
	styleUrl: './mask-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => MaskFieldComponent),
			multi: true,
		},
	],
})
export class MaskFieldComponent extends FormInputControlValueAccessor {
	@Input() type!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() mask!: string;
	@Input() placeholder!: string;
	@Input() slotChar: string = '';
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() errorMessage!: string;
	@Input() error!: ValidationErrors | null | undefined;
	@Input() form!: NgForm;
	@Input() required!: boolean;
	@Input() minlength!: number;
	@Input() maxlength!: number;
}
