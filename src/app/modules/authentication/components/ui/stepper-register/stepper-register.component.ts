import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
} from '@angular/core';
import { NewAuthUserFormDatas } from '@shared/models/classes/auth-user/new-auth-user-form-datas.class';
import { NewUserUserProfileFormDatas } from '@shared/models/classes/user-details/new-user-details-form-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-stepper-register',
	templateUrl: './stepper-register.component.html',
	styleUrl: './stepper-register.component.scss',
})
export class StepperRegisterComponent implements OnDestroy {
	@Input() newUserPersonalInfos!: NewUserUserProfileFormDatas;
	@Input() newUserAuth!: NewAuthUserFormDatas;

	@Output()
	sendStepValueToParent: EventEmitter<number> = new EventEmitter<number>();

	private _subscription: Subscription = new Subscription();

	constructor(private _authService: AuthService) {}

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
