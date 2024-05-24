import { Component, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserPasswordFormDatas } from '@shared/models/classes/user-password-form-datas.class';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-account-password-form',
	templateUrl: './account-password-form.component.html',
	styleUrl: './account-password-form.component.scss',
})
export class AccountPasswordFormComponent implements OnDestroy {
	@Input() connectedUser!: UserAuthPrimaryDatas;
	private _subscription: Subscription = new Subscription();

	accountPasswordFormDatas: UserPasswordFormDatas = new UserPasswordFormDatas(
		'',
		'',
		'',
	);

	constructor(private _userAuthCrudService: UserAuthCrudService) {}

	onSubmit(form: NgForm): void {
		this._subscription.add(
			this._userAuthCrudService
				.updatePassword(
					this.connectedUser,
					this.accountPasswordFormDatas.oldPassword,
					this.accountPasswordFormDatas.newPassword,
				)
				.subscribe(() => form.reset()),
		);
	}

	ngOnDestroy(): void {
		this._subscription.unsubscribe();
	}
}
