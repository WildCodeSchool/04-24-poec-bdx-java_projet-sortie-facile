import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { newUser } from '../../../shared/models/types/newUser.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  createdUser: newUser = {
    username: '',
    email: '',
    password: '',
    confirmation: ''
  };

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

}
