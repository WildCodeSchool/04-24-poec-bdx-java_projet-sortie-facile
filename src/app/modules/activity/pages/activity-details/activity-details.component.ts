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
      description: 'Venez taper dasn la balle pour un match amicale',
      category: 'sport',
      imgUrl:
        ' /assets/photos/joueur-football-masculin-ballon-terrain-herbe.jpg',
    };
  }
}
