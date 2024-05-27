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
		'bob-l-eponge',
		'bob-leqponge@medoc.fr',
		'123456789',
		'123456789',
		UserRoleEnum.USER,
		AccountStatus.ACTIVE,
		'',
	);

	newUserPersonalInfos: NewUserPersonalInfosFormDatas =
		new NewUserPersonalInfosFormDatas(
			'bob',
			"l'éponge",
			'5',
			'2',
			'',
			33000,
			'Tart cheesecake marshmallow chupa chups muffin topping. Dessert dragée topping tootsie roll marshmallow toffee gingerbread sesame snaps. Sugar plum danish pastry bonbon donut gingerbread cake. Cookie jelly tiramisu jelly-o cake cake topping tootsie roll topping. Tiramisu cupcake danish cake soufflé sugar plum gummi bears sweet. Tiramisu fruitcake icing tart danish.',
			new Department('3', 'Gironde'),
			new City(3, 'Bordeaux'),
			'',
			'01-34-45-57-68',
			'26/12/1999',
			UserGenderEnum.MALE,
			['1'],
			'papaye',
		);

	constructor(private _authService: AuthService) {}

	ngOnInit(): void {
		this.providerNameList = this._authService.getProviderNameList();
		this.step = 1;
	}

	onChangeStep(newStepValue: number): void {
		this.step = newStepValue;
	}

	formNextStep(): void {
		this.formStep = 2;
	}

	formPreviousStep(): void {
		this.formStep = 1;
	}
	onRegister(): void {}
}
