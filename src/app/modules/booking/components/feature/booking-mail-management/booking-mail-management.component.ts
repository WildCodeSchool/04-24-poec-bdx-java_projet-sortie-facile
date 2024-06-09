import { Component, Input, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { AuthService } from '@shared/services/auth.service';

@Component({
	selector: 'app-booking-mail-management',
	templateUrl: './booking-mail-management.component.html',
	styleUrl: './booking-mail-management.component.scss',
})
export class BookingMailManagementComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	connectedUser!: AuthUserPrimaryDatas;

	constructor(protected _authService: AuthService) {}

	ngOnInit(): void {
		this.connectedUser = this._authService.getConnectedUserData();
	}
}
