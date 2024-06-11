import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserLayoutLink } from '@shared/models/types/utils/user-layout-link.type';

@Pipe({
	name: 'accountNavActiveLink',
})
export class AccountNavActiveLinkPipe implements PipeTransform {
	constructor(private _activatedRoute: ActivatedRoute) {}

	transform(items: UserLayoutLink[]): UserLayoutLink[] {
		const url: string = '/user/' + this._activatedRoute.snapshot.url[0].path;

		return items.map(item => ({ ...item, active: url === item.path }));
	}
}