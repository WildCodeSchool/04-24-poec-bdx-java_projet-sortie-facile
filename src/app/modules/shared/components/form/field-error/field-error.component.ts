import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.scss',
})
export class FieldErrorComponent {
  @Input({ required: true }) ref!: NgModel;

  errorMessages: any = {
    required: { message: 'Ce champs est requis' },
    minlength: { message: 'Ce champs doit comporter 8 caractère minimum' },
    maxlength: { message: 'Ce champs doit comporter 20 caractère maximum' },
    email: { message: "Votre email n'est pas au bon format" },
  };
}
