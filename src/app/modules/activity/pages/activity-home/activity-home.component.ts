import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivityService } from '../../../shared/services/activity.service';
import { Observable } from 'rxjs';
import { Activity } from '../../../shared/models/types/activity.type';

@Component({
  selector: 'app-activity-home',
  templateUrl: './activity-home.component.html',
  styleUrl: './activity-home.component.scss',
})
export class ActivityHomeComponent {
  newActivity$!: Observable<Activity>;
  constructor(private activityService: ActivityService) {}

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
    this.newActivity$ = this.activityService.postNewActivity$(form.value);
    console.log('form value : ', form.value);
  }
}
