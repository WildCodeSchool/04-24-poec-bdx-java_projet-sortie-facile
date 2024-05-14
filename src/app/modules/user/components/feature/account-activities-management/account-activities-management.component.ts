import { Component, Input, OnInit } from '@angular/core';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
	selector: 'app-account-activities-management',
	templateUrl: './account-activities-management.component.html',
	styleUrl: './account-activities-management.component.scss',
})
export class AccountActivitiesManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: UserAuthPrimaryDatas;

	constructor(private _authService: AuthService) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
	}
}
