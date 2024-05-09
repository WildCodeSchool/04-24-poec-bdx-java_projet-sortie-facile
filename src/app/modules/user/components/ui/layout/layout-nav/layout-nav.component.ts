import { Component, OnInit } from '@angular/core';
import { UserLayoutLink } from '../../../../../shared/models/types/user-layout-link';

@Component({
  selector: 'app-layout-nav',
  templateUrl: './layout-nav.component.html',
  styleUrl: './layout-nav.component.scss',
})
export class LayoutNavComponent implements OnInit {
  items!: UserLayoutLink[];

  ngOnInit(): void {
    this.items = [
      { label: 'General', path: '/', active: true },
      { label: 'Edit profil', path: '/', active: false },
      { label: 'Password', path: '/', active: false },
      { label: 'Centres d’interêts', path: '/', active: false },
      { label: 'Notifications', path: '/', active: false },
      { label: 'Mes activités', path: '/', active: false },
      { label: 'Mon calendrier', path: '/', active: false },
    ];
  }
}
