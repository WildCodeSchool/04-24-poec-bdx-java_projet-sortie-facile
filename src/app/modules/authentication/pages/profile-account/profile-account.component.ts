import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrl: './profile-account.component.scss'
})
export class ProfileAccountComponent {

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
