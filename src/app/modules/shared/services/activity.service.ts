import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../models/types/activity.type';
import { Observable, catchError, map, tap } from 'rxjs';
import { Activities } from '../models/types/activities.type';
import { Category } from '../models/types/category.type';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}
  activity!: Activity;
  activities!: Activity;
  category!: Category;
  categories!: Category[];
  getActivityList$(): Observable<Activity[]> {
    return this.http
      .get<Activities>('http://localhost:3000/activity')
      .pipe(map((response: Activities) => response));
  }

  getActivityById$(id: number): Observable<Activity> {
    return this.http
      .get<Activity>(`http://localhost:3000/activity/${id}`)
      .pipe(map((response: Activity) => response));
  }
  getActivityCategoryList$(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`http://localhost:3000/category`)
      .pipe(map((response: Category[]) => response));
  }

  postNewActivity$(newActivity: Activity): Observable<Activity> {
    return this.http
      .post<Activity>('http://localhost:3000/activity', newActivity)
      .pipe(
        tap((data) => {
          console.log('POST Request is successful ', data);
        }),
        catchError((error) => {
          console.log('Error', error);
          throw error;
        })
      );
  }

  // deleteActivity(id: number): Observable<unknown> {
  //   return this.http.delete(`http://localhost:3000/activity/${id}`).pipe(
  //     tap((data) => {
  //       console.log('POST Request is successful ', data);
  //     }),
  //     catchError((error) => {
  //       console.log('Error', error);
  //       throw error;
  //     })
  //   );
  // }
}
