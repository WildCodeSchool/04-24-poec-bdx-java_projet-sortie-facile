import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-nav-responsive',
  templateUrl: './layout-nav-responsive.component.html',
  styleUrl: './layout-nav-responsive.component.scss',
})
export class LayoutNavResponsiveComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.items = [
      {
        id: '1',
        label: 'General',
        command: () => {
          this._router.navigateByUrl('/user/home');
        },
        state: { path: '/user/home' },
      },
      {
        id: '2',
        label: 'Profil',
        command: () => {
          this._router.navigateByUrl('/user/profile');
        },
        state: { path: '/user/profile' },
      },
      {
        id: '3',
        label: 'Mot de passe',
        command: () => {
          this._router.navigateByUrl('/user/password');
        },
        state: { path: '/user/password' },
      },
      {
        id: '4',
        label: "Centres d'intérêts",
        command: () => {
          this._router.navigateByUrl('/user/center-of-interests');
        },
        state: { path: '/user/center-of-interests' },
      },
      {
        id: '5',
        label: 'Notifications',
        command: () => {
          this._router.navigateByUrl('/user/notification');
        },
        state: { path: '/user/notification' },
      },
      {
        id: '6',
        label: 'Mes activités',
        command: () => {
          this._router.navigateByUrl('/user/activities');
        },
        state: { path: '/user/activities' },
      },
      {
        id: '7',
        label: 'Mon calendrier',
        command: () => {
          this._router.navigateByUrl('/user/calendar');
        },
        state: { path: '/user/calendar' },
      },
      {
        id: '8',
        label: 'Supprimer mon compte',
        styleClass: 'delete-item',
        state: { path: '' },
      },
    ];

    this.activeItem = this._setActiveItem(this.items);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  private _setActiveItem(items: MenuItem[]): MenuItem {
    const url: string = '/user/' + this._activatedRoute.snapshot.url[0].path;

    const activeItemIndex: number = Number(
      items.find((item) => item.state?.['path'] === url)?.id
    );

    return items[activeItemIndex - 1];
  }
}
