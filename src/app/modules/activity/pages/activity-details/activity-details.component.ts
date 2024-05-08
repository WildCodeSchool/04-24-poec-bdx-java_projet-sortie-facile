import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../../../shared/models/types/activity.type';
import { Observable } from 'rxjs';
import { ActivityService } from '../../../shared/services/activity.service';
import { ActivatedRoute } from '@angular/router';
import { Activities } from '../../../shared/models/types/activities.type';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.scss',
})
export class ActivityDetailsComponent implements OnInit {
  activities$!: Observable<Activities>;
  activity$!: Observable<Activity>;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.activity$ = this.activityService.getActivityById$(id);
  }

  // constructor() {
  //   this.activity = {
  //     id: '1',
  //     name: 'foot amateur',
  //     departement: 'Rhône',
  //     city: 'Lyon',
  //     date: '2021-12-12',
  //     age: 18,
  //     imgUrl:
  //       'src/assets/photos/joueur-football-masculin-ballon-terrain-herbe.jpg',
  //     link: 'www.trouloulou.com',
  //     description: 'Venez taper dasn la balle pour un match amicale',
  //     nbGuest: 10,

  //     category: 'sport',
  //   };
  // }
}
