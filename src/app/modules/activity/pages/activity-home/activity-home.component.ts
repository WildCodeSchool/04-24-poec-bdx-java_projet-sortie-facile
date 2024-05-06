import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Data } from '@angular/router';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrl: './activity-home.component.scss',
})
export class ActivityHomeComponent {
  formData: { activityTitle: string; activityDate: Date } = {
    activityTitle: '',
    activityDate: new Date(),
  };
  onSubmit(form: NgForm): void {
    console.log('form value : ', form.value);
  }
}
