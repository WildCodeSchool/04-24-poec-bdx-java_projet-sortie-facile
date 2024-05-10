import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-textarea-field',
	templateUrl: './textarea-field.component.html',
	styleUrl: './textarea-field.component.scss',
})
export class TextareaFieldComponent {
	@Input() labelFor!: string;
	@Input() labelContent!: string;

	value!: string;
}
