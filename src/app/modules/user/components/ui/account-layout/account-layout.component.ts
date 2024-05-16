import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '@shared/services/account.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-account-layout',
	templateUrl: './account-layout.component.html',
	styleUrl: './account-layout.component.scss',
})
export class AccountLayoutComponent implements OnInit {
	@Input() avatarSrc!: string;
	@Input() avatarAlt!: string;
	@Input() username!: string;
	@Input() pageTitle!: string;
	@Input() pageDescription!: string;

	items: MenuItem[] | undefined;
	activeItem: MenuItem | undefined;

	ngOnInit() {
		this.items = this._accountService.getLayoutItems();
		this.activeItem = this.items[0];
	}

	constructor(private _accountService: AccountService) {}

	onActiveItemChange(event: MenuItem) {
		this.activeItem = event;
	}
}
