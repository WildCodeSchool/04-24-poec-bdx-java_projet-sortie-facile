import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class PrimengModule {}
