import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
} from '@angular/core';
import { NewUserFormDatas } from '@shared/models/classes/new-user-form-datas.class';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-stepper-register',
	templateUrl: './stepper-register.component.html',
	styleUrl: './stepper-register.component.scss',
})
export class StepperRegisterComponent implements OnDestroy {
	@Input() newUserPersonalInfos!: NewUserPersonalInfosFormDatas;
	@Input() newUserAuth!: NewUserFormDatas;

	@Output()
	sendStepValueToParent: EventEmitter<number> = new EventEmitter<number>();

	private _subscription: Subscription = new Subscription();

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
	) {}

	onClick(value: number): void {
		this.sendStepValueToParent.emit(value);
	}

	onRegister(): void {
		this._subscription.add(
			this._authService
				.createUserWithEmailAndPassword(
					this.newUserAuth,
					this.newUserPersonalInfos,
				)
				.subscribe(),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
