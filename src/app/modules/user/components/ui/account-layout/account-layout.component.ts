import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'General' },
      { label: 'Edit profil' },
      { label: 'Password' },
      { label: "Centres d'intérêts" },
      { label: 'Notifications' },
      { label: 'Mes activités' },
      { label: 'Mon calendrier' },
      { label: 'Supprimer mon compte', styleClass: 'delete-item' },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
