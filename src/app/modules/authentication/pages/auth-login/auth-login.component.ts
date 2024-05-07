import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { connectedUserDatas } from '../../../shared/models/types/connectedUserDatas.model';

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
    username: '',
    password: '',
    email: '',
  };

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }
}
