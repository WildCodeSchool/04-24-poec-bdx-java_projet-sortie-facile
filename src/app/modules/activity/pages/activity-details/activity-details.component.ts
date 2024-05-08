import { Component } from '@angular/core';
import { Activity } from '../../../shared/models/types/activity.type';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrl: './activity-details.component.scss',
})
export class ActivityDetailsComponent {
  activity!: Activity;

  constructor() {
    this.activity = {
      id: '1',
      name: 'foot amateur',
      departement: 'Rhône',
      city: 'Lyon',
      date: '2021-12-12',
      age: 18,
      imgUrl:
        'src/assets/photos/joueur-football-masculin-ballon-terrain-herbe.jpg',
      link: 'www.trouloulou.com',
      description: 'Venez taper dasn la balle pour un match amicale',
      nbGuest: 10,

      category: 'sport',
    };
  }
}
