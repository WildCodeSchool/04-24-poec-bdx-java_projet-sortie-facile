import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Department } from '@shared/models/classes/department.class';
import { DepartmentService } from '@shared/services/department.service';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-select-department',
	templateUrl: './select-department.component.html',
	styleUrl: './select-department.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectDepartmentComponent),
			multi: true,
		},
	],
})
export class SelectDepartmentComponent
	implements OnInit, OnDestroy, ControlValueAccessor
{
	departments!: Department[];
	selectedDepartments!: Department;
	activityDepartmentsList$!: Observable<Department[]>;
	private _subscription: Subscription = new Subscription();

	@Input() id!: string;
	@Input() name!: string;
	@Input() labelFor!: string;
	@Input() labelContent!: string;

	disabled!: boolean;
	value!: string;

	constructor(private _departmentService: DepartmentService) {}

	// ngOnInit() {
	// 	this._subscription.add(
	// 		this._departmentService
	// 			.getDepartmentsList$()
	// 			.pipe(map(departments => (this.departments = departments)))
	// 			.subscribe(),
	// 	);
	// }

	ngOnInit(): void {
		this.activityDepartmentsList$ =
			this._departmentService.getDepartmentsList$();
	}
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

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
