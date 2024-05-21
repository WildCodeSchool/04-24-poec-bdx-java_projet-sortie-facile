import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from '@authentication/authentication-routing.module';
import { AuthLoginComponent } from '@authentication/pages/auth-login/auth-login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AuthLoginManagementComponent } from '@authentication/components/feature/auth-login-management/auth-login-management.component';
import { AuthLayoutComponent } from './components/ui/auth-layout/auth-layout.component';
import { AuthRegisterManagementComponent } from './components/feature/auth-register-management/auth-register-management.component';
import { AuthRegisterComponent } from './pages/auth-register/auth-register.component';
import { StepperRegisterComponent } from './components/ui/stepper-register/stepper-register.component';
import { RegisterAuthFormComponent } from './components/ui/register-form/register-auth-form/register-auth-form.component';
import { RegisterPersonalInfoFormComponent } from './components/ui/register-form/register-personal-info-form/register-personal-info-form.component';

@NgModule({
	declarations: [
		AuthLoginComponent,
		AuthLoginManagementComponent,
		AuthLayoutComponent,
		AuthRegisterManagementComponent,
		AuthRegisterComponent,
		StepperRegisterComponent,
		RegisterAuthFormComponent,
		RegisterPersonalInfoFormComponent,
	],
	imports: [
		CommonModule,
		AuthenticationRoutingModule,
		SharedModule,
		FormsModule,
	],
})
export class AuthenticationModule {}
