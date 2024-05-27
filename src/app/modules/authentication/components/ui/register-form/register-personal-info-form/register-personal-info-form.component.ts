import { Component, Input } from '@angular/core';
import { NewUserUserDetailsFormDatas } from '@shared/models/classes/user-details/new-user-details-form-datas.class';
import { InputNumberModeEnum } from '@shared/models/enums/InputNumberMode.enum';

@Component({
	selector: 'app-register-personal-info-form',
	templateUrl: './register-personal-info-form.component.html',
	styleUrl: './register-personal-info-form.component.scss',
})
export class RegisterPersonalInfoFormComponent {
	@Input() newUserPersonalInfos!: NewUserUserDetailsFormDatas;

	readonly inputNumberModeEnum = InputNumberModeEnum;
}
