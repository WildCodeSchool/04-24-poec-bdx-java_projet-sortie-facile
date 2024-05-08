import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../models/types/activity.type';
import { Observable, map } from 'rxjs';
import { Activities } from '../models/types/activities.type';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}
  activity!: Activity;
  activities!: Activity;
  getActivityList$(): Observable<Activity[]> {
    return this.http
      .get<Activities>('assets/json/db.json')
      .pipe(map((response: Activities) => response.activity));
  }

  getActivityById$(id: number): Observable<Activity> {
    return this.getActivityList$().pipe(
      map(
        (activities: Activity[]) =>
          activities.find(
            (activity: Activity) => activity.id === id
          ) as Activity
      )
    );
  }
}
