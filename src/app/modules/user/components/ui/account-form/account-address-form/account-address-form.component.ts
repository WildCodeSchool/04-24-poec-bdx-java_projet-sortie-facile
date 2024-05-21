import { Component } from '@angular/core';
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
export class AccountAddressFormComponent {
	connectedUser!: UserAuthPrimaryDatas;
	userDetails$!: Observable<UserDetails>;
	isViewDatas: boolean = true;
	userAddressDatasForm!: UserDetailsAddressForm;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.userDetails$ = this._userService.getUserInfos$(this.connectedUser.id);
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
		this.userDetails$ = this._userService.patchUserInfo$(
			this.connectedUser.id,
			this.userAddressDatasForm,
		);

		this.isViewDatas = !this.isViewDatas;
	}
}
