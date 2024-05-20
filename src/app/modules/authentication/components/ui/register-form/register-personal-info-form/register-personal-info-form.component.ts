import { Component, Input } from '@angular/core';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';
import { InputNumberModeEnum } from '@shared/models/enums/InputNumberMode.enum';

@Component({
	selector: 'app-register-personal-info-form',
	templateUrl: './register-personal-info-form.component.html',
	styleUrl: './register-personal-info-form.component.scss',
})
export class RegisterPersonalInfoFormComponent {
	@Input() newUserPersonalInfos!: NewUserPersonalInfosFormDatas;

	readonly inputNumberModeEnum = InputNumberModeEnum;
}
