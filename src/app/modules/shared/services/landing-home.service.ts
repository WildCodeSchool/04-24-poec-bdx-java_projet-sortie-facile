import { Injectable } from '@angular/core';
import { getFunctionimgDatas } from '@shared/models/types/functionimg-datas.type';

@Injectable({
	providedIn: 'root',
})
export class LandingHomeService {
	constructor() {}

	getFunctionimgDatas(): getFunctionimgDatas[] {
		return [
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
