/* eslint-disable no-console */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../models/types/activity.type';
import { Observable, catchError, map, switchMap, tap } from 'rxjs';
import { Activities } from '../models/types/activities.type';
import { Category } from '../models/types/category.type';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	activity!: Activity;
	activities!: Activity;
	category!: Category;
	categories!: Category[];
	constructor(private http: HttpClient) {}

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
    .get<Activity[]>(`http://localhost:3000/activity?categoryId=${id}`)
    .pipe(map((activities: Activity[]) => activities.map(activity => activity.name).join(', ')));
}
getCategoryTitle$(title: string): Observable<string> {
    return this.http
      .get<any>(`http://localhost:3000/category/${title}`)
      .pipe(
        map((category: any) => {
          // Supposons que le titre de la catégorie soit stocké dans une propriété "title"
          return category.title;
        })
      );
  }

getActivityListByCategoryId$(id: number): Observable<Activity[]> {
	return this.http
	  .get<Activity[]>(`http://localhost:3000/activity?categoryId=${id}`);
  }
	filteredActivityList$(name: string): Observable<Activity[]> {
		return this.getActivityList$().pipe(
			map((activityList: Activity[]) =>
				activityList.filter((activity: Activity) =>
					activity.name.toLowerCase().includes(name.toLowerCase()),
				),
			),
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
        return this.http.get<Activity[]>('http://localhost:3000/activity').pipe(
            switchMap(activities => {
                // Trouver la dernière id dans le tableau d'activités
                const lastActivity = activities.reduce((prev, current) => (+current.id > +prev.id) ? current : prev);
                // Incrémenter l'id de la nouvelle activité
                newActivity.id = (+lastActivity.id + 1);
                // Poster la nouvelle activité avec la nouvelle id
                return this.http.post<Activity>('http://localhost:3000/activity', newActivity);
            }),
            tap(data => {
                console.log('POST Request is successful ', data);
            }),
            catchError(error => {
                console.log('Error', error);
                throw error;
            })
        );
    }

	deleteActivity$(id: number): Observable<unknown> {
	  return this.http.delete(`http://localhost:3000/activity/${id}`).pipe(
	    tap((data) => {
	      console.log('Delete Request is successful ', data);
	    }),
	    catchError((error) => {
	      console.log('Error', error);
	      throw error;
	    })
	  );
	}
	updateActivity$(id: number): Observable<unknown> {
	  return this.http.delete(`http://localhost:3000/activity/${id}`).pipe(
	    tap((data) => {
	      console.log('Delete Request is successful ', data);
	    }),
	    catchError((error) => {
	      console.log('Error', error);
	      throw error;
	    })
	  );
	}
}
