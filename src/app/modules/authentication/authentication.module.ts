import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [CommonModule, AuthenticationRoutingModule, SharedModule],
})
export class AuthenticationModule {}
