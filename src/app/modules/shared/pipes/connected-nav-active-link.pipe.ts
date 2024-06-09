import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';

@Pipe({
	name: 'connectedNavActiveLink',
})
export class ConnectedNavActiveLinkPipe implements PipeTransform {
	constructor(private _activatedRoute: ActivatedRoute) {}

	transform(items: LayoutLink[], primaryRoute: string): LayoutLink[] {
		const url: string =
			`/${primaryRoute}/` + this._activatedRoute.snapshot.url[0].path;

		return items.map(item => ({ ...item, active: url === item.path }));
	}
}
