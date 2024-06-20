import { Component, OnInit } from '@angular/core';
import { UserProfileAddressForm } from '@shared/models/classes/user-details/user-details-address-form.class';
import { InputNumberModeEnum } from '@shared/models/enums/InputNumberMode.enum';
import { UserService } from '@shared/services/user.service';
import { Observable, map } from 'rxjs';
import { AuthUserResponse } from '@shared/models/classes/auth-user/auth-user-response.class';
import { TokenService } from '@shared/services/token.service';
import { UserProfile } from '@shared/models/classes/user-details/user-profile.class';
import { Region } from '@shared/models/classes/address/region.class';
import { RegionService } from '@shared/services/address/region.service';

@Component({
	selector: 'app-account-address-form',
	templateUrl: './account-address-form.component.html',
	styleUrl: './account-address-form.component.scss',
})
export class AccountAddressFormComponent implements OnInit {
	connectedUser!: AuthUserResponse;
	userProfile$!: Observable<UserProfile>;
	userAddressRegion!: Region;
	isViewDatas: boolean = true;
	userAddressDatasForm!: UserProfileAddressForm;

	readonly inputNumberModeEnum = InputNumberModeEnum;

	constructor(
		private _userService: UserService,
		private _tokenService: TokenService,
		private _regionService: RegionService,
	) {}

	ngOnInit(): void {
		this._tokenService
			._getTokenDetailsSubject$()
			.subscribe((connectedUser: AuthUserResponse) => {
				this.connectedUser = connectedUser;
			});

		this.userProfile$ = this._userService.getUserInfos$(this.connectedUser.id);
		this.userProfile$
			.pipe(
				map((userProfile: UserProfile) => {
					this.userAddressDatasForm = {
						...userProfile,
						email: this.connectedUser.sub,
					};
				}),
			)
			.subscribe();
	}

	getRegion(regionId: number): Observable<Region> {
		return this._regionService.getRegionById$(regionId);
	}

	showIsViewDatas(isViewDatas: boolean) {
		this.isViewDatas = isViewDatas;
	}

	onSave(): void {
		// TODO
		// CONNECT FRONT-BACK update address

		// this.UserProfile$ = this._userService.patchUserInfo$(
		// 	this.connectedUser.id,
		// 	this.userAddressDatasForm,
		// );

		this.isViewDatas = !this.isViewDatas;
	}
}
