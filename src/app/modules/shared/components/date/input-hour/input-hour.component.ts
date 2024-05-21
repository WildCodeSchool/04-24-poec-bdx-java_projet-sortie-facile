import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgForm } from '@angular/forms';
import { FormInputControlValueAccessor } from '@shared/models/classes/form-input-control-value-accessor.class';

@Component({
	selector: 'app-input-hour',
	templateUrl: './input-hour.component.html',
	styleUrl: './input-hour.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputHourComponent),
			multi: true,
		},
	],
})
export class InputHourComponent extends FormInputControlValueAccessor {
	time: Date | undefined;
	@Input() inputId!: string;
	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() form!: NgForm;
}
