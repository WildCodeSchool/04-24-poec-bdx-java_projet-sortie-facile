import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewUserFormDatas } from '@shared/models/classes/new-user-form-datas.class';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';

@Component({
	selector: 'app-stepper-register',
	templateUrl: './stepper-register.component.html',
	styleUrl: './stepper-register.component.scss',
})
export class StepperRegisterComponent {
	@Input() newUserPersonalInfos!: NewUserPersonalInfosFormDatas;
	@Input() newUserAuth!: NewUserFormDatas;
	@Output()
	sendStepValueToParent: EventEmitter<number> = new EventEmitter<number>();

	onClick(value: number): void {
		this.sendStepValueToParent.emit(value);
	}

	onRegister(): void {
		console.log('ok');
		console.log(this.newUserPersonalInfos);
		console.log(this.newUserAuth);
	}
}
