import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms';
import { CreateAccountCardComponent } from './components/ui/create-account-card/create-account-card.component';


@NgModule({
  declarations: [
  
    CreateAccountCardComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
