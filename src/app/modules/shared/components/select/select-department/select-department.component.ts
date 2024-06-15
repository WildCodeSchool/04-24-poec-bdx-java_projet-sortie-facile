import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Department } from '@shared/models/classes/address/department.class';
import { DepartmentService } from '@shared/services/department.service';
import { Observable, Subscription } from 'rxjs';

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
	departments: Department[] = [];
	selectedDepartmentId: number = 1;
	selectedDepartment: Department | undefined;

	activityDepartmentsList$!: Observable<Department[]>;
	private _subscription: Subscription = new Subscription();

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() isMultiple!: boolean;

	disabled!: boolean;
	value!: number;

	constructor(private _departmentService: DepartmentService) {}

	ngOnInit(): void {
		this.activityDepartmentsList$ =
			this._departmentService.getDepartmentsList$();

		this._subscription.add(
			this.activityDepartmentsList$.subscribe(departments => {
				this.departments = departments;
			}),
		);
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

		if (this.departments && this.departments.length > 0) {
			this.selectedDepartment = this.departments.find(
				dept => dept.id === value,
			);
		}
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
