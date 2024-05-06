import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { ModalComponent } from './components/modal/modal/modal.component';

@NgModule({
  declarations: [TextFieldComponent, PasswordFieldComponent, ModalComponent],
  imports: [CommonModule, PrimengModule, FormsModule],
  exports: [
    PrimengModule,
    FormsModule,
    TextFieldComponent,
    PasswordFieldComponent,
    ModalComponent,
  ],
})
export class SharedModule {}
