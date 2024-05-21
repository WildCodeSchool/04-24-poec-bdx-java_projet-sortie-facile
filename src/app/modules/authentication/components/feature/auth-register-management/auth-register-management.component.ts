import { Component, OnInit } from '@angular/core';
import { City } from '@shared/models/classes/city.class';
import { Department } from '@shared/models/classes/department.class';
import { NewUserFormDatas } from '@shared/models/classes/new-user-form-datas.class';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';
import { UserGenderEnum } from '@shared/models/enums/user-genre.enum';
import {
	AccountStatus,
	UserRoleEnum,
} from '@shared/models/enums/user-role.enum';
import { AuthRedirect } from '@shared/models/types/auth-redirect.type';
import { AuthProvider } from '@shared/models/types/provider.type';
import { AuthService } from '@shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-auth-register-management',
	templateUrl: './auth-register-management.component.html',
	styleUrl: './auth-register-management.component.scss',
})
export class AuthRegisterManagementComponent implements OnInit {
	providerNameList!: AuthProvider[];
	lastUserId!: string;
	step!: number;
	private _subscription: Subscription = new Subscription();

	formStep: number = 1;

	redirect: AuthRedirect = {
		text: 'Vous avez déjà un compte ?',
		link: ['/auth/login'],
		linkLabel: 'Se connecter',
	};

	newUserAuth: NewUserFormDatas = new NewUserFormDatas(
		'Pimpoye',
		'Pimpoye@medoc.fr',
		'mafemmecestmasoeur',
		'mafemmecestmasoeur',
		UserRoleEnum.USER,
		AccountStatus.ACTIVE,
	);

	newUserPersonalInfos: NewUserPersonalInfosFormDatas =
		new NewUserPersonalInfosFormDatas(
			'',
			'',
			'',
			'',
			'',
			33000,
			'',
			new Department('1', ''),
			new City(1, ''),
			'',
			'',
			'',
			UserGenderEnum.MALE,
			[],
			'',
		);

	constructor(private _authService: AuthService) {}

	ngOnInit(): void {
		this.providerNameList = this._authService.getProviderNameList();
		this.step = 1;
	}

	onChangeStep(newStepValue: number): void {
		this.step = newStepValue;
	}

<<<<<<< HEAD
	formNextStep(): void {
		this.formStep = 2;
	}

	formPreviousStep(): void {
		this.formStep = 1;
	}
=======
	onRegister(): void {}
>>>>>>> be91e0fa6cbb9b2a4161894a990757496804f8c6
}
