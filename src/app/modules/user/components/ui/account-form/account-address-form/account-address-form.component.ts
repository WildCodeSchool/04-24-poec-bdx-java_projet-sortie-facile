import { Component, OnInit } from '@angular/core';
import { UserDetailsAddressForm } from '@shared/models/classes/user-details/user-details-address-form.class';
import { UserDetails } from '@shared/models/classes/user-details/user-details.class';
import { InputNumberModeEnum } from '@shared/models/enums/InputNumberMode.enum';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map } from 'rxjs';

@Component({
	selector: 'app-account-address-form',
	templateUrl: './account-address-form.component.html',
	styleUrl: './account-address-form.component.scss',
})
export class AccountAddressFormComponent implements OnInit {
	connectedUser!: AuthUserPrimaryDatas;
	userDetails$!: Observable<UserDetails>;
	isViewDatas: boolean = true;
	userAddressDatasForm!: UserDetailsAddressForm;

	readonly inputNumberModeEnum = InputNumberModeEnum;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.userDetails$ = this._userService.getUserInfos$(
			this.connectedUser.userDetailsId,
		);
		this.userDetails$
			.pipe(
				map((userDetails: UserDetails) => {
					this.userAddressDatasForm = {
						...userDetails,
						email: this.connectedUser.email,
					};
				}),
			)
			.subscribe();
	}

	showIsViewDatas(isViewDatas: boolean) {
		this.isViewDatas = isViewDatas;
	}

	onSave(): void {
		console.log(this.connectedUser.userDetailsId, this.userAddressDatasForm);

		this.userDetails$ = this._userService.patchUserInfo$(
			this.connectedUser.userDetailsId,
			this.userAddressDatasForm,
		);

		this.isViewDatas = !this.isViewDatas;
	}
}
