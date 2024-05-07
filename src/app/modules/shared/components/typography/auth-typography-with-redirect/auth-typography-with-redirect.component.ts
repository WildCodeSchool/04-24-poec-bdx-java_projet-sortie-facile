import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-typography-with-redirect',
  templateUrl: './auth-typography-with-redirect.component.html',
  styleUrl: './auth-typography-with-redirect.component.scss',
})
export class AuthTypographyWithRedirectComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) linkLabel!: string;
  @Input({ required: true }) link!: string | any[] | null | undefined;
}
