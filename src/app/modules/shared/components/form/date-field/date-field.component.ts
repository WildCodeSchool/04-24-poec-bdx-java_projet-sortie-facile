import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent {

  formGroup!: FormGroup;

    ngOnInit() {
        this.formGroup = new FormGroup({
            date: new FormControl<Date | null>(null)
        });
    } 
}
