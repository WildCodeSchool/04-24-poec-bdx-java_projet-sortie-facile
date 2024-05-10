import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '@authentication/pages/auth-login/auth-login.component';
import { CreateAccountComponent } from '@authentication/pages/create-account/create-account.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent,
  },
  {
    path: 'register',
    component: CreateAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
