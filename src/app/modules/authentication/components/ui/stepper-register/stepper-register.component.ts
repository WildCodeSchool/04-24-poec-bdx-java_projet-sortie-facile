import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-stepper-register',
	templateUrl: './stepper-register.component.html',
	styleUrl: './stepper-register.component.scss',
})
export class StepperRegisterComponent {
	@Output() sendStepValueToParent: EventEmitter<number> =
		new EventEmitter<number>();

	onClick(value: number): void {
		this.sendStepValueToParent.emit(value);
	}
}
