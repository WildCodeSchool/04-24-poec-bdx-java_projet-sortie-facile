import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Category } from '../../../models/types/category.type';
import { ActivityService } from '../../../services/activity.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectCategoryComponent),
      multi: true,
    },
  ],
})
export class SelectCategoryComponent implements ControlValueAccessor {
  categories!: Category[];
  category$!: Observable<Category>;
  activityCategoryList$!: Observable<Category[]>;
  selectedCategory!: Category;
  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activityCategoryList$ =
      this.activityService.getActivityCategoryList$();

    console.log(this.activityCategoryList$);
  }
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
