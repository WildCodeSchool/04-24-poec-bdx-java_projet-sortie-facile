import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { FieldErrorComponent } from './components/form/field-error/field-error.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { InputDateComponent } from './components/date/input-date/input-date.component';
import { InputHourComponent } from './components/date/input-hour/input-hour.component';
import { ButtonSocialComponent } from './components/button/button-social/button-social.component';
import { DividerComponent } from './components/divider/divider.component';
import { ButtonFormComponent } from './components/button/button-form/button-form.component';

@NgModule({
  declarations: [
    TextFieldComponent,
    PasswordFieldComponent,
    FieldErrorComponent,
    ModalComponent,
    InputDateComponent,
    InputHourComponent,
    ButtonSocialComponent,
    DividerComponent,
    ButtonFormComponent,
  ],
  imports: [CommonModule, PrimengModule, FormsModule],
  exports: [
    PrimengModule,
    FormsModule,
    TextFieldComponent,
    PasswordFieldComponent,
    FieldErrorComponent,
    ModalComponent,
    InputDateComponent,
    InputHourComponent,
    ButtonSocialComponent,
    DividerComponent,
    ButtonFormComponent,
  ],
})
export class SharedModule {}
