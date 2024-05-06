import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-typography-with-redirect',
  templateUrl: './auth-typography-with-redirect.component.html',
  styleUrl: './auth-typography-with-redirect.component.scss',
})
export class AuthTypographyWithRedirectComponent {
  @Input() text!: string;
  @Input() linkLabel!: string;
  @Input() link!: string | any[] | null | undefined;
}
