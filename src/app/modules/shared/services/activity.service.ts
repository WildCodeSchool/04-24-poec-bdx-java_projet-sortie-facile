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

  getCategoryById$(id: number): Observable<string> {
    return this.http
      .get<Category>(`URL_DE_VOTRE_API/categorie/${id}`)
      .pipe(map((category: Category) => category.title));
  }

  filteredActivityList$(name: string): Observable<Activity[]> {
    return this.getActivityList$().pipe(
      map((activityList: Activity[]) =>
        activityList.filter((activity: Activity) =>
          activity.name.toLowerCase().includes(name.toLowerCase())
        )
      )
    );
  }
  // finir filtre de laliste par cetegorie
  // filteredActivityListByCategoryId$(id: Number): Observable<Category[]> {
  //   return this.getActivityList$().pipe(
  //     map((activityList: activity[]) =>
  //       activityList.filter((category: Category) =>
  //         activity.category.toLowerCase().includes(categorie.toLowerCase())
  //       )
  //     )
  //   );
  // }

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
