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
	selectedDepartmentId: string = ''; // Changed to string type
	selectedDepartment: Department | undefined;

	activityDepartmentsList$!: Observable<Department[]>;
	private _subscription: Subscription = new Subscription();

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;
	@Input() isMultiple!: boolean;
	disabled!: boolean;
	value!: string;

	constructor(private _departmentService: DepartmentService) {}

	ngOnInit(): void {
		this.activityDepartmentsList$ =
			this._departmentService.getDepartmentsList$();
		this._subscription.add(
			this.activityDepartmentsList$.subscribe(departments => {
				this.departments = departments;
				console.log('Departments loaded:', this.departments);
			}),
		);
	}

	onChanged!: (value: string) => void;
	onTouched!: () => void;

	onInputChange(value: string): void {
		if (this.disabled) {
			return;
		}
		this.value = value;
		this.selectedDepartmentId = value;
		// Trouver le département correspondant dans la liste des départements
		this.selectedDepartment = this.departments.find(dept => dept.id === value);
		console.log('Selected Department:', this.selectedDepartment);
		this.onChanged(value);
		this.markAsTouched();
	}

	writeValue(value: string): void {
		this.selectedDepartmentId = value;
		if (this.departments && this.departments.length > 0) {
			this.selectedDepartment = this.departments.find(
				dept => dept.id === value,
			);
			console.log('writeValue - Selected Department:', this.selectedDepartment);
		}
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
