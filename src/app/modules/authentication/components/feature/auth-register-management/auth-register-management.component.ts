import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewUserFormDatas } from '@shared/models/classes/new-user-form-datas.class';
import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';
import { AuthRedirect } from '@shared/models/types/auth-redirect.type';
import { AuthProvider } from '@shared/models/types/provider.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-auth-register-management',
	templateUrl: './auth-register-management.component.html',
	styleUrl: './auth-register-management.component.scss',
})
export class AuthRegisterManagementComponent implements OnInit, OnDestroy {
	providerNameList!: AuthProvider[];
	lastUserId!: string;
	step!: number;
	private _subscription: Subscription = new Subscription();

	redirect: AuthRedirect = {
		text: 'Vous avez déjà un compte ?',
		link: ['/auth/login'],
		linkLabel: 'Se connecter',
	};

	newUser: NewUserFormDatas = new NewUserFormDatas(
		this.lastUserId,
		'Pimpoye',
		'Pimpoye@medoc.fr',
		'mafemmecestmasoeur',
		'mafemmecestmasoeur',
		UserRoleEnum.USER,
		AccountStatus.ACTIVE,
	);

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.providerNameList = this.authService.getProviderNameList();
		this.step = 1;
	}

	onSubmit(): void {
		this._subscription.add(
			this.authService
				.createUserWithEmailAndPassword(this.newUser)
				.subscribe((user: UserAuthPrimaryDatas) => {
					localStorage.setItem('user', JSON.stringify(user));
				}),
		);
	}

	onChangeStep(newStepValue: number): void {
		this.step = newStepValue;
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
