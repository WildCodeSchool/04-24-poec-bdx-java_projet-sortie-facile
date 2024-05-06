import { Component } from '@angular/core';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrl: './select-city.component.scss',
})
export class SelectCityComponent {
  cities = [
    {
      name: 'paris',
    },
    { name: 'london' },
  ];
}
