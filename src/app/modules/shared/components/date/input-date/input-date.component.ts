import { Component } from '@angular/core';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
})
export class InputDateComponent {
  datetime24h: Date[] | undefined;
}
