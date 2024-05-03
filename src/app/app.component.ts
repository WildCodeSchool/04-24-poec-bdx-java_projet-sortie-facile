import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
      },
    ];
  }
}
