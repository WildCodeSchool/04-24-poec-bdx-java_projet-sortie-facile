import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-fw pi-file',
      },
      {
        label: 'Contact',
        icon: 'pi pi-fw pi-pencil',
      },

      {
        label: 'Activités',
        icon: 'pi pi-fw pi-user',
        routerLink: '/activity/home',
      },
    ];
  }
}
