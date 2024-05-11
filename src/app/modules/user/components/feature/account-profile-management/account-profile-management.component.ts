import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from '@shared/models/types/user-details.type';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserService } from '@shared/services/user/user.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-account-profile-management',
	templateUrl: './account-profile-management.component.html',
	styleUrl: './account-profile-management.component.scss',
})
export class AccountProfileManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: UserAuthPrimaryDatas;
	userDetails$!: Observable<UserDetails>;
	isViewDatas: boolean = true;

	constructor(
		private _authService: AuthService,
		private _userService: UserService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
		this.userDetails$ = this._userService.getUserInfos$(this.connectedUser.id);
	}

	fn(isViewDatas: boolean) {
		this.isViewDatas = isViewDatas;
	}
}
