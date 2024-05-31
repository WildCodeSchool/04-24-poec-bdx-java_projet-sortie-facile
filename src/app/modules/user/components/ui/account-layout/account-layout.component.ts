import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalDeleteAccountComponent } from '@shared/components/modal/modal-confirm-delete-account/modal-confirm-delete-account.component';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
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

	@ViewChild(ModalDeleteAccountComponent, { static: false })
	modalComponent!: ModalDeleteAccountComponent;

	items: MenuItem[] | undefined;
	activeItem: MenuItem | undefined;
	connectedUser!: AuthUserPrimaryDatas;
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

	onModal(): void {
		this.modalComponent.onSubmit();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
