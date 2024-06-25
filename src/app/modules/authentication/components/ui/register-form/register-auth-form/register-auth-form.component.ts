import { Component, Input } from '@angular/core';
import { NewAuthUserFormDatas } from '@shared/models/classes/auth-user/new-auth-user-form-datas.class';

@Component({
	selector: 'app-register-auth-form',
	templateUrl: './register-auth-form.component.html',
	styleUrl: './register-auth-form.component.scss',
})
export class RegisterAuthFormComponent {
	@Input() newUserAuth!: NewAuthUserFormDatas;
}
