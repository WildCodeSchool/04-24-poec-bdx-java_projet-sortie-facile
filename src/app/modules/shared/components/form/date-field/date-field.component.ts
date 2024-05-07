import { Component } from '@angular/core';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent {
  date: Date | undefined;
}
