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
				'Découvrez dès maintenant notre sélection dactivités et trouvez linspiration pour vivre des expériences uniques près de chez vous !',
				[FullActivityRouteEnum.HOME],
				'Découvrir les activités disponibles',
			),
			new FunctionimgDatas(
				'assets/photos/7732590_5217.svg',
				'',
				'Créer une activité',
				'Créez une activité dès aujourdhui et invitez dautres à se joindre à vous pour partager des moments inoubliables ensemble !',
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
				'Inscrivez-vous dès maintenant à une activité pour y participer et partager des moments enrichissants avec dautres passionnés !',
				[
					connectedUser
						? FullActivityRouteEnum.HOME
						: FullAuthenticationRouteEnum.LOGIN,
				],
				connectedUser ? "S'inscrire à une activité" : 'Se connecter',
			),
		];
	}
}
