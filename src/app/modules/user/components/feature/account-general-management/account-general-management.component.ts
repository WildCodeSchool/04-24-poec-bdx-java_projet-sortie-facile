import { Component, Input, OnInit } from '@angular/core';
import { UserAuthPrimaryDatas } from '../../../../shared/models/types/user-list-response-api.type';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-account-general-management',
  templateUrl: './account-general-management.component.html',
  styleUrl: './account-general-management.component.scss',
})
export class AccountGeneralManagementComponent implements OnInit {
  @Input() avatarSrc!: string;
  @Input() avatarAlt!: string;
  @Input() pageTitle!: string;
  @Input() pageDescription!: string;

  connectedUser!: UserAuthPrimaryDatas;

  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {
    this.connectedUser = this._AuthService.getConnectedUserData();
  }
}
