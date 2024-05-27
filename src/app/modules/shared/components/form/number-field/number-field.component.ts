import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm, ValidationErrors } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/models/classes/utils/form-input-control-value-accessor.class';
import { InputNumberModeEnum } from '@shared/models/enums/InputNumberMode.enum';

@Component({
	selector: 'app-number-field',
	templateUrl: './number-field.component.html',
	styleUrl: './number-field.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => NumberFieldComponent),
			multi: true,
		},
	],
})
export class NumberFieldComponent extends FormInputControlValueAccessor {
	@Input() type!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() fieldName!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() min!: number;
	@Input() max!: number;
	@Input() mode!: InputNumberModeEnum;
	@Input() errorMessage!: string;
	@Input() error!: ValidationErrors | null | undefined;
	@Input() form!: NgForm;
	@Input() required!: boolean;
	@Input() minlength!: number;
	@Input() maxlength!: number;
}
