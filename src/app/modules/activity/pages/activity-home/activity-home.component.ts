import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrl: './activity-home.component.scss',
})
export class ActivityHomeComponent {
  showModal: boolean = false;
  formData: {
    activityTitle: string;
    activityDate: '';
    activityHour: '';
    activityCity: '';
    activityCategory: '';
    activityNumberGuest: '';
    activityImg: '';
    activityLink: '';
    activityDescription: '';
  } = {
    activityTitle: '',
    activityDate: '',
    activityHour: '',
    activityCity: '',
    activityCategory: '',
    activityNumberGuest: '',
    activityImg: '',
    activityLink: '',
    activityDescription: '',
  };
  onSubmit(form: NgForm): void {
    console.log('form value : ', form.value);
  }
}
