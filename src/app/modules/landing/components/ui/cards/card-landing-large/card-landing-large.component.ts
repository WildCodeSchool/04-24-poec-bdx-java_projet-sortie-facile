import { Component, Input } from '@angular/core';
import {
	FullAuthenticationRouteEnum,
	FullUserRouteEnum,
} from '@shared/models/enums/routes/full-routes';

@Component({
	selector: 'app-card-landing-large',
	templateUrl: './card-landing-large.component.html',
	styleUrl: './card-landing-large.component.scss',
})
export class CardLandingLargeComponent {
	@Input() imgSrc!: string;
	@Input() imgAlt!: string;
	@Input() title!: string;
	@Input() description!: string;
	@Input() ctaPrimarylabel!: string;
	@Input() ctaSecondarylabel!: string;
	@Input() connectedUser: boolean = false;

	fullAuthenticationRoute = FullAuthenticationRouteEnum;
	fullUserRouteEnum = FullUserRouteEnum;
}
