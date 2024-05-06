import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-hour',
  templateUrl: './input-hour.component.html',
  styleUrl: './input-hour.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputHourComponent),
      multi: true,
    },
  ],
})
export class InputHourComponent implements ControlValueAccessor {
  time: Date | undefined;
  @Input() type!: string; // text or email
  @Input() id!: string;
  @Input() name!: string;
  @Input() labelFor!: string;
  @Input() labelContent!: string;

  disabled!: boolean;
  value!: string;

  onChanged!: (value: string) => void;
  onTouched!: () => void;

  onInputChange(value: string): void {
    if (this.disabled) {
      return;
    }

    this.onChanged(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  markAsTouched(): void {
    this.onTouched();
  }
}
