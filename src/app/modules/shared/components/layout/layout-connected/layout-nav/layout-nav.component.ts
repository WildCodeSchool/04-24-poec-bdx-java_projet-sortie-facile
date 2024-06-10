import { Component, Input } from '@angular/core';
import { LayoutLink } from '@shared/models/types/utils/layout-link.type';

@Component({
	selector: 'app-layout-nav',
	templateUrl: './layout-nav.component.html',
	styleUrl: './layout-nav.component.scss',
})
export class LayoutNavComponent {
	@Input() items: LayoutLink[] = [];
}
