// import { Component, Input, OnDestroy } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { AuthUserPasswordFormDatas } from '@shared/models/classes/auth-user/auth-user-password-form-datas.class';
// import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
// import { UserAuthCrudService } from '@shared/services/user-auth-crud.service';
// import { Subscription } from 'rxjs';

// @Component({
// 	selector: 'app-account-password-form',
// 	templateUrl: './account-password-form.component.html',
// 	styleUrl: './account-password-form.component.scss',
// })
// export class AccountPasswordFormComponent implements OnDestroy {
// 	@Input() connectedUser!: AuthUserPrimaryDatas;
// 	private _subscription: Subscription = new Subscription();

// 	accountPasswordFormDatas: AuthUserPasswordFormDatas =
// 		new AuthUserPasswordFormDatas('', '', '');

// 	constructor(private _userAuthCrudService: UserAuthCrudService) {}

// 	onSubmit(form: NgForm): void {
// 		this._subscription.add(
// 			this._userAuthCrudService
// 				.updatePassword(
// 					this.connectedUser,
// 					this.accountPasswordFormDatas.oldPassword,
// 					this.accountPasswordFormDatas.newPassword,
// 				)
// 				.subscribe(() => form.reset()),
// 		);
// 	}

// 	ngOnDestroy(): void {
// 		this._subscription.unsubscribe();
// 	}
// }
