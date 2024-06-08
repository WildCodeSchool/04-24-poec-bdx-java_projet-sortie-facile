import { Injectable } from '@angular/core';
import { FunctionimgDatas } from '@shared/models/classes/utils/function-img-datas.class';
import {
	FullActivityRouteEnum,
	FullAuthenticationRouteEnum,
} from '@shared/models/enums/routes/full-routes';

@Injectable({
	providedIn: 'root',
})
export class LandingHomeService {
	constructor() {}

	getFunctionimgDatas(connectedUser: boolean): FunctionimgDatas[] {
		return [
			new FunctionimgDatas(
				'assets/photos/7732590_5217.svg',
				'',
				'Découvrir les activités',
				'Danish jelly chocolate bar lollipop cupcake chocolate cake danish oat cake cotton candy. Jujubes soufflé lollipop candy canes marzipan jelly-o fruitcake caramels.',
				[FullActivityRouteEnum.HOME],
				'Découvrir les activités disponibles',
			),
			new FunctionimgDatas(
				'assets/photos/7732590_5217.svg',
				'',
				'Créer une activité',
				'Danish jelly chocolate bar lollipop cupcake chocolate cake danish oat cake cotton candy. Jujubes soufflé lollipop candy canes marzipan jelly-o fruitcake caramels.',
				[
					connectedUser
						? FullActivityRouteEnum.POST
						: FullAuthenticationRouteEnum.LOGIN,
				],
				connectedUser ? 'Créer une activité' : 'Se connecter',
			),
			new FunctionimgDatas(
				'assets/photos/7732590_5217.svg',
				'',
				"S'inscrire à une activité",
				'Danish jelly chocolate bar lollipop cupcake chocolate cake danish oat cake cotton candy. Jujubes soufflé lollipop candy canes marzipan jelly-o fruitcake caramels.',
				[
					connectedUser
						? FullActivityRouteEnum.POST
						: FullAuthenticationRouteEnum.LOGIN,
				],
				connectedUser ? "S'inscrire à une activité" : 'Se connecter',
			),
		];
	}
}
