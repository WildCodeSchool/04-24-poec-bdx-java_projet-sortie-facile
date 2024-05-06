import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';
import { TextFieldComponent } from './components/form/text-field/text-field.component';

@NgModule({
  declarations: [TextFieldComponent],
  imports: [CommonModule, PrimengModule, FormsModule],
  exports: [PrimengModule, FormsModule, TextFieldComponent],
})
export class SharedModule {}
