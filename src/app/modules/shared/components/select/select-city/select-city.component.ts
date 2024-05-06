import { Component } from '@angular/core';
import { City } from '../../../models/types/city.type';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrl: './select-city.component.scss',
})
export class SelectCityComponent {
  cities!: City[];

  selectedCity!: City;

  ngOnInit() {
    this.cities = [
      { name: 'New York' },
      { name: 'Rome' },
      { name: 'London' },
      { name: 'Istanbul' },
      { name: 'Paris' },
    ];
  }
}
