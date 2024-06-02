import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-testimonial',
	templateUrl: './card-testimonial.component.html',
	styleUrl: './card-testimonial.component.scss',
})
export class CardTestimonialComponent {
	@Input() title!: string;
	@Input() message!: string;
	@Input() note!: number;
	@Input() user!: string;
}
