import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimengModule, FormsModule],
  exports: [PrimengModule, FormsModule],
})
export class SharedModule {}
