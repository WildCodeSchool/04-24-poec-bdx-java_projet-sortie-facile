import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output()
  emitChanges: EventEmitter<string> = new EventEmitter<string>();

  searchedValue: string = '';

  onChange(value: string) {
    this.emitChanges.emit(this.searchedValue);
  }
}
