import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-layout-header',
	templateUrl: './layout-header.component.html',
	styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent {
	@Input({ required: true }) avatarSrc!: string;
	@Input({ required: true }) avatarAlt!: string;
	@Input({ required: true }) username!: string;
	@Input({ required: true }) pageTitle!: string;
	@Input() pageDescription!: string;
}
