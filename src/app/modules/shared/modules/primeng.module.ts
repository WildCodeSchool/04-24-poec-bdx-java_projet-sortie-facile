import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
  ],
})
export class PrimengModule {}
