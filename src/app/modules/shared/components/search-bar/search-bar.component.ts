import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
	@Output()
	emitChanges: EventEmitter<string> = new EventEmitter<string>();

	@Input() searchedValue: string = '';

	onChange() {
		this.emitChanges.emit(this.searchedValue);
	}
}
