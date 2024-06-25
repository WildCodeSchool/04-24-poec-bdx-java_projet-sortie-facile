import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-layout-split',
	templateUrl: './layout-split.component.html',
	styleUrl: './layout-split.component.scss',
})
export class LayoutSplitComponent {
	@Input({ required: true }) pageTitle!: string;
	@Input({ required: true }) backgroundImage!: string;
}
