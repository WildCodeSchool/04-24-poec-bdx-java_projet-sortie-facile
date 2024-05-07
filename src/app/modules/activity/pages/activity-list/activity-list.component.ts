import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../../../shared/models/types/activity.type';
import { ActivityService } from '../../../shared/services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent implements OnInit {
  activityList$!: Observable<Activity[]>;

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.activityList$ = this.activityService.getActivityList$();

    console.log(this.activityList$);
  }
}
