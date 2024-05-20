import { Injectable } from '@angular/core';
import { Region } from '@shared/models/classes/region.class';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class RegionService {
	private _regionList$!: Observable<Region[]>;

	constructor() {
		this._regionList$ = of([
			{ id: '1', name: 'Auvergne-Rhône-Alpes' },
			{ id: '2', name: 'Hauts-de-France' },
			{ id: '3', name: 'Nouvelle-Aquitaine' },
			{ id: '4', name: "Provence-Alpes-Côte d'Azur" },
			{ id: '5', name: 'Occitanie' },
			{ id: '6', name: 'Bretagne' },
			{ id: '7', name: 'Grand Est' },
			{ id: '8', name: 'Île-de-France' },
			{ id: '9', name: 'Normandie' },
			{ id: '10', name: 'Bourgogne-Franche-Comté' },
			{ id: '11', name: 'Centre-Val de Loire' },
			{ id: '12', name: 'Corse' },
			{ id: '13', name: 'Pays de la Loire' },
			{ id: '14', name: 'Région Sud' },
			{ id: '15', name: 'Guyane' },
			{ id: '16', name: 'Guadeloupe' },
			{ id: '17', name: 'La Réunion' },
			{ id: '18', name: 'Martinique' },
			{ id: '19', name: 'Mayotte' },
		]);
	}

	public getRegionList$(): Observable<Region[]> {
		return this._regionList$;
	}
}
