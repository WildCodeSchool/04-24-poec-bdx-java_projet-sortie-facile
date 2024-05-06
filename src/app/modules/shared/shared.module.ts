import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { InputDateHourComponent } from './components/date/input-date-hour/input-date-hour.component';
@NgModule({
  declarations: [
    TextFieldComponent,
    PasswordFieldComponent,
    ModalComponent,
    InputDateHourComponent,
  ],
  imports: [CommonModule, PrimengModule, FormsModule],
  exports: [
    PrimengModule,
    FormsModule,
    TextFieldComponent,
    PasswordFieldComponent,
    ModalComponent,
    InputDateHourComponent,
  ],
})
export class SharedModule {}
