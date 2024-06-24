import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Department } from '@shared/models/classes/address/department.class';
import { DepartmentService } from '@shared/services/address/department.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-select-department',
	templateUrl: './select-department.component.html',
	styleUrls: ['./select-department.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectDepartmentComponent),
			multi: true,
		},
	],
})
export class SelectDepartmentComponent implements OnInit, ControlValueAccessor {
	selectedDepartmentId: number = 1;
	departmentList$!: Observable<Department[]>;

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() isMultiple!: boolean;
	@Input() disabled: boolean = false;
	@Input() isDisabled!: boolean;

	value!: number;

	constructor(private _departmentService: DepartmentService) {}

	ngOnInit(): void {
		this.departmentList$ = this._departmentService.getDepartmentList$();
	}

	onChanged!: (value: number) => void;
	onTouched!: () => void;

	onInputChange(value: number): void {
		if (this.disabled) {
			return;
		}

		this.onChanged(value);
	}

	writeValue(value: number): void {
		this.selectedDepartmentId = value;
	}

	registerOnChange(fn: (value: number) => void): void {
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
