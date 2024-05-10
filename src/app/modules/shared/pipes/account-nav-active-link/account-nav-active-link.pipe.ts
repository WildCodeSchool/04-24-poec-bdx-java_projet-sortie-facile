import { Pipe, PipeTransform } from '@angular/core';
import { UserLayoutLink } from '../../models/types/user-layout-link';
import { ActivatedRoute } from '@angular/router';

@Pipe({
  name: 'accountNavActiveLink',
})
export class AccountNavActiveLinkPipe implements PipeTransform {
  constructor(private _activatedRoute: ActivatedRoute) {}

  transform(items: UserLayoutLink[]): UserLayoutLink[] {
    const url = '/user/' + this._activatedRoute.snapshot.url[0].path;

    return items.map((item) => ({ ...item, active: url === item.path }));
  }
}
