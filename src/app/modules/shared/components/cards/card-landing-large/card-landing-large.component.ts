import { Component, Input } from '@angular/core';

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
}
