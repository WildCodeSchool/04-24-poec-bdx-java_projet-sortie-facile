import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-general-management',
  templateUrl: './account-general-management.component.html',
  styleUrl: './account-general-management.component.scss',
})
export class AccountGeneralManagementComponent {
  @Input() avatarSrc!: string;
  @Input() avatarAlt!: string;
  @Input() username!: string;
  @Input() pageTitle!: string;
  @Input() pageDescription!: string;
}
