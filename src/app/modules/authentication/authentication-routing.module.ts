import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '@authentication/pages/auth-login/auth-login.component';
import { AuthRegisterComponent } from '@authentication/pages/auth-register/auth-register.component';
import { AuthenticationRouteEnum } from '@shared/models/enums/routes/route.enum';

const routes: Routes = [
	{
		path: AuthenticationRouteEnum.LOGIN,
		component: AuthLoginComponent,
	},
	{
		path: AuthenticationRouteEnum.REGISTER,
		component: AuthRegisterComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
