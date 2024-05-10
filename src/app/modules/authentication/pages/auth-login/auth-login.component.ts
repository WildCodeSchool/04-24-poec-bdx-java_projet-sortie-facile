import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { connectedUserDatas } from '@shared/models/types/connectedUserDatas.model';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
})
export class AuthLoginComponent {
  providerNameList = [
    { name: 'Google', color: 'blue' },
    { name: 'Facebook', color: 'blue' },
    { name: 'Twitter', color: 'blue' },
  ];

  connectedUser: connectedUserDatas = {
    username: 'johndoe',
    password: '123456789',
    email: 'j.doe@mail.com',
  };

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm): void {
    console.log('form values', form.value);

    this.authService
      .loginWithEmailAndPassword(
        this.connectedUser.username,
        this.connectedUser.password
      )
      .subscribe((user) => {
        localStorage.setItem('user', JSON.stringify(user));
      });
  }
}
