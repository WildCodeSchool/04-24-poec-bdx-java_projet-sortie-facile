import { Component } from '@angular/core';
import { PrimaryRouteEnum } from '@shared/models/enums/routes/route.enum';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
})
export class FooterComponent {
	PrimaryRoute = PrimaryRouteEnum;
}
