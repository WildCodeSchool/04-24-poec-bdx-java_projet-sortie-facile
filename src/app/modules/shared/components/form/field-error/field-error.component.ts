import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ErrorMessages } from '@shared/models/types/error-message.type';
import { FormErrorMessageService } from '@shared/services/form-errors.service';

@Component({
	selector: 'app-field-error',
	templateUrl: './field-error.component.html',
	styleUrl: './field-error.component.scss',
})
export class FieldErrorComponent implements OnInit {
	@Input({ required: true }) ref!: NgModel;
	@Input({ required: true }) fieldName!: string;

	errorMessages!: ErrorMessages;

	constructor(private _formErrorMessageService: FormErrorMessageService) {}

	ngOnInit(): void {
		this.errorMessages = {
			required: {
				message: this._formErrorMessageService.getRequiredErrorMessage(
					this.fieldName,
				).message,
			},
			minlength: {
				message: this._formErrorMessageService.getMinlengthErrorMessage(
					this.fieldName,
					3,
				).message,
			},
			maxlength: {
				message: this._formErrorMessageService.getMinlengthErrorMessage(
					this.fieldName,
					8,
				).message,
			},
			email: {
				message: this._formErrorMessageService.getEmailErrorMessage().message,
			},
		};
	}
}
