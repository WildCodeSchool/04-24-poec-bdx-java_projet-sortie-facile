import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrl: './activity-home.component.scss',
})
export class ActivityHomeComponent {
  formData: { activityTitle: string; activityDate: ''; activityHour: '' } = {
    activityTitle: '',
    activityDate: '',
    activityHour: '',
  };
  onSubmit(form: NgForm): void {
    console.log('form value : ', form.value);
  }
}
