import { Component, Input } from '@angular/core';
import { NewUserFormDatas } from '@shared/models/classes/new-user-form-datas.class';

@Component({
	selector: 'app-register-auth-form',
	templateUrl: './register-auth-form.component.html',
	styleUrl: './register-auth-form.component.scss',
})
export class RegisterAuthFormComponent {
	@Input() newUserAuth!: NewUserFormDatas;
}
