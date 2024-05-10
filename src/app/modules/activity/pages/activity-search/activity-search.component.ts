import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html',
  styleUrl: './activity-search.component.scss',
})
export class ActivitySearchComponent {
  searchedValue: string = '';

  onSearch(event: string) {
    this.searchedValue = event;
  }
}
