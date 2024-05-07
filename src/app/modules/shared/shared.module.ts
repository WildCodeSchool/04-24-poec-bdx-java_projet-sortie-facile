import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { ModalComponent } from './components/modal/modal/modal.component';
import { InputDateComponent } from './components/date/input-date/input-date.component';
import { InputHourComponent } from './components/date/input-hour/input-hour.component';
import { DropzoneFieldComponent } from './components/form/dropzone-field/dropzone-field.component';
import { ToastModule } from 'primeng/toast';
import { TextareaFieldComponent } from './components/form/textarea-field/textarea-field.component';


@NgModule({
  declarations: [
    TextFieldComponent,
    PasswordFieldComponent,
    ModalComponent,
    InputDateComponent,
    InputHourComponent,
    DropzoneFieldComponent,
    TextareaFieldComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule, 
    FormsModule, 
    ToastModule,
  ],
  exports: [
    PrimengModule,
    FormsModule,
    TextFieldComponent,
    PasswordFieldComponent,
    DropzoneFieldComponent,
    ModalComponent,
    InputDateComponent,
    InputHourComponent,
    TextareaFieldComponent
  ],
})
export class SharedModule {}
