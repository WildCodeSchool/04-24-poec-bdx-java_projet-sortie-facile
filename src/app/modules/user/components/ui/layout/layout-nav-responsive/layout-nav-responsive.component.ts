import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout-nav-responsive',
  templateUrl: './layout-nav-responsive.component.html',
  styleUrl: './layout-nav-responsive.component.scss',
})
export class LayoutNavResponsiveComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'General',
        command: () => {
          this._router.navigateByUrl('/');
        },
      },
      {
        label: 'Profil',
        command: () => {
          this._router.navigateByUrl('/user/profile');
        },
      },
      {
        label: 'Mot de passe',
        command: () => {
          this._router.navigateByUrl('/user/password');
        },
      },
      {
        label: "Centres d'intérêts",
        command: () => {
          this._router.navigateByUrl('/user/center-of-interests');
        },
      },
      {
        label: 'Notifications',
        command: () => {
          this._router.navigateByUrl('/user/notification');
        },
      },
      {
        label: 'Mes activités',
        command: () => {
          this._router.navigateByUrl('/user/activities');
        },
      },
      {
        label: 'Mon calendrier',
        command: () => {
          this._router.navigateByUrl('/user/calendar');
        },
      },
      { label: 'Supprimer mon compte', styleClass: 'delete-item' },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
