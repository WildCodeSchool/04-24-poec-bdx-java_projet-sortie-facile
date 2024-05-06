import { Component } from '@angular/core';

@Component({
  selector: 'app-input-date-hour',
  templateUrl: './input-date-hour.component.html',
  styleUrl: './input-date-hour.component.scss',
})
export class InputDateHourComponent {
  datetime12h: Date[] | undefined;

  datetime24h: Date[] | undefined;

  time: Date[] | undefined;
}
