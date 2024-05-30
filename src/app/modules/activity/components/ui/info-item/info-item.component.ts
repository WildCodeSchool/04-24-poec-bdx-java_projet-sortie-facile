import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-info-item',
	templateUrl: './info-item.component.html',
	styleUrl: './info-item.component.scss',
})
export class InfoItemComponent {
	@Input() icon!: string;
	@Input() content!: string;
}
