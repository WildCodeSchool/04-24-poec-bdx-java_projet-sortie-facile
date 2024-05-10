import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Activity } from '../../../shared/models/types/activity.type';
import { ActivityService } from '../../../shared/services/activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrl: './activity-list.component.scss',
})
export class ActivityListComponent implements OnInit {
  activityList$!: Observable<Activity[]>;
  activity$!: Observable<Activity>;

  constructor(private activityService: ActivityService) {}
  @Input()
  searchedValue: string = '';

  ngOnChanges(changes: string): void {
    // si searchedValue est vide, ma méthode "filter" renvoie TOUS les burgers
    // sinon, elle renvera les burgers filtrés
    this.activityList$ = this.activityService.filteredActivityList$(
      this.searchedValue
    );
  }
  ngOnInit(): void {
    this.activityList$ = this.activityService.getActivityList$();

    console.log(this.activityList$);
  }

  getCategoryTitle(categoryId: number): Observable<string> {
    return this.activityService.getCategoryById$(categoryId);
  }
}
