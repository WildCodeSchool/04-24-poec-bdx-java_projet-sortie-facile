import { Component, OnInit } from '@angular/core';
import { LandingFunctioningDatas } from '../../../shared/models/types/landing-functioning-datas.type';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.scss',
})
export class LandingHomeComponent implements OnInit {
  functioningDatas!: LandingFunctioningDatas[];

  ngOnInit(): void {
    this.functioningDatas = [
      {
        imgSrc: 'assets/photos/activity-discover.svg',
        imgAlt: '',
        title: 'Découvrir les activités',
        description:
          'Danish jelly chocolate bar lollipop cupcake chocolate cake danish oat cake cotton candy. Jujubes soufflé lollipop candy canes marzipan jelly-o fruitcake caramels.',
        link: ['/activity/list'],
        linkLabel: 'Découvrir les activités disponibles',
      },
      {
        imgSrc: 'assets/photos/activity-create.svg',
        imgAlt: '',
        title: 'Créer une activité',
        description:
          'Danish jelly chocolate bar lollipop cupcake chocolate cake danish oat cake cotton candy. Jujubes soufflé lollipop candy canes marzipan jelly-o fruitcake caramels.',
        link: ['/activity/create'],
        linkLabel: 'Ajouter une activité',
      },
    ];
  }
}
