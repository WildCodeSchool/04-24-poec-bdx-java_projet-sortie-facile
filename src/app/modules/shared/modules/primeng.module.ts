import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipModule } from 'primeng/chip';
@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    ChipModule,
  ],
})
export class PrimengModule {}
