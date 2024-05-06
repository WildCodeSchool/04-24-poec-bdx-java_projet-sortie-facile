import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { InputDateComponent } from './components/date/input-date/input-date.component';
import { InputHourComponent } from './components/date/input-hour/input-hour.component';
import { SelectCityComponent } from './components/select/select-city/select-city.component';
@NgModule({
  declarations: [
    TextFieldComponent,
    PasswordFieldComponent,
    ModalComponent,
    InputDateComponent,
    InputHourComponent,
    SelectCityComponent,
  ],
  imports: [CommonModule, PrimengModule, FormsModule],
  exports: [
    PrimengModule,
    FormsModule,
    TextFieldComponent,
    PasswordFieldComponent,
    ModalComponent,
    InputDateComponent,
    InputHourComponent,
    SelectCityComponent,
  ],
})
export class SharedModule {}
