import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from '@authentication/authentication-routing.module';
import { AuthLoginComponent } from '@authentication/pages/auth-login/auth-login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AuthLoginManagementComponent } from '@authentication/components/feature/auth-login-management/auth-login-management.component';
import { AuthLayoutComponent } from './components/ui/auth-layout/auth-layout.component';

@NgModule({
	declarations: [AuthLoginComponent, AuthLoginManagementComponent, AuthLayoutComponent],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		SharedModule,
		FormsModule,
	],
})
export class AuthenticationModule {}
