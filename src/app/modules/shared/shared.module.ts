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
import { SelectCityComponent } from './components/select/select-city/select-city.component';
import { SelectCategoryComponent } from './components/select/select-category/select-category.component';
import { SelectNumberComponent } from './components/select/select-number/select-number.component';

@NgModule({
  declarations: [
    TextFieldComponent,
    PasswordFieldComponent,
    FieldErrorComponent,
    ModalComponent,
    InputDateComponent,
    InputHourComponent,
    SelectCityComponent,
    SelectCategoryComponent,
    SelectNumberComponent,
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
    SelectCityComponent,
    SelectCategoryComponent,
    SelectNumberComponent,
  ],
})
export class SharedModule {}
