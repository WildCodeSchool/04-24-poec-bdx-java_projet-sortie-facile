import { Component, OnInit } from '@angular/core';
import { InputNumberModeEnum } from '@shared/models/enums/InputNumberMode.enum';
import {
	UserDetails,
	UserDetailsAddressForm,
} from '@shared/models/types/user-details.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { Observable, map } from 'rxjs';

@Component({
	selector: 'app-account-address-form',
	templateUrl: './account-address-form.component.html',
	styleUrl: './account-address-form.component.scss',
})
export class AccountAddressFormComponent implements OnInit {
	connectedUser!: UserAuthPrimaryDatas;
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
