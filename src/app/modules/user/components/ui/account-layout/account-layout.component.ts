import { Component, Input, OnInit } from '@angular/core';
import { NewUserPersonalInfosFormDatas } from '@shared/models/classes/new-user-personal-infos-form-datas.class';
import { AccountStatus } from '@shared/models/enums/user-role.enum';
import { newUser } from '@shared/models/types/newUser.model';
import { AccountService } from '@shared/services/account.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-account-layout',
	templateUrl: './account-layout.component.html',
	styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() username!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	items: MenuItem[] | undefined;
	activeItem: MenuItem | undefined;
	newUser!: newUser;
	newUserPersonalInfosFormDatas!: NewUserPersonalInfosFormDatas;

	ngOnInit() {
		this.items = this._accountService.getLayoutItems();
		this.activeItem = this.items[0];
	}

	constructor(private _accountService: AccountService) {}

	onActiveItemChange(event: MenuItem) {
		this.activeItem = event;
	}

	onUnsubscribe() {
		this.newUser.status = AccountStatus.INACTIVE;
		this.newUserPersonalInfosFormDatas.deleteUserInfos(this.newUser.id);
	}
}
