import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/models/classes/utils/form-input-control-value-accessor.class';

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
export class InputDateComponent extends FormInputControlValueAccessor {
	time: Date | undefined;
	@Input() inputId!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() showIcon!: boolean;

	@Input() form!: NgForm;
}
