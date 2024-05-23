import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserAuthPrimaryDatas } from '@shared/models/types/user-list-response-api.type';
import { AccountService } from '@shared/services/account.service';
import { AuthService } from '@shared/services/auth.service';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-account-layout',
	templateUrl: './account-layout.component.html',
	styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent implements OnInit, OnDestroy {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() username!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	items: MenuItem[] | undefined;
	activeItem: MenuItem | undefined;
	connectedUser!: UserAuthPrimaryDatas;
	subscription: Subscription = new Subscription();

	ngOnInit() {
		this.connectedUser = this._authService.getConnectedUserData();
		this.items = this._accountService.getLayoutItems();
		this.activeItem = this.items[0];
	}

	constructor(
		private _accountService: AccountService,
		private _authService: AuthService,
	) {}

	onActiveItemChange(event: MenuItem) {
		this.activeItem = event;
	}

	onDeleteUser(): void {
		console.log("ca marche???");
		this._authService.deleteUser(this.connectedUser.id).subscribe();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
