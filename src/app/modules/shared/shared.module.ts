import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './modules/primeng.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimengModule],
  exports: [PrimengModule],
})
export class SharedModule {}
