import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthLoginComponent } from './pages/auth-login/auth-login.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProfileAccountComponent } from './pages/profile-account/profile-account.component';

@NgModule({
  declarations: [
    AuthLoginComponent,
    ProfileAccountComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    FormsModule
  ]
})

export class AuthenticationModule {

}
