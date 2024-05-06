import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { connectedUserDatas } from '../../../shared/models/types/connectedUserDatas.model';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss',
})
export class AuthLoginComponent {
  connectedUser: connectedUserDatas = {
    username: '',
  };

  onSubmit(form: NgForm): void {
    console.log(form.value);
  }
}
