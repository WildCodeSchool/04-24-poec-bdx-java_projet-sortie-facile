import { Component, Input } from '@angular/core';
import { Activity } from '../../../shared/models/types/activity.type';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.scss',
})
export class ActivityCardComponent {
  @Input() activity!: Activity;
}
