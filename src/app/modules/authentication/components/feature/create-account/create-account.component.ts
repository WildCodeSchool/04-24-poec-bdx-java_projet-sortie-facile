import { Component } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmation: string = '';

  onSubmit() {
    console.log('form submitted');
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmation = '';
  }

}
