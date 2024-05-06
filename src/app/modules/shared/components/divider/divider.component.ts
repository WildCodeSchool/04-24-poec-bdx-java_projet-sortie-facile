import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
})
export class DividerComponent {
  @Input({ required: true }) align!:
    | 'center'
    | 'left'
    | 'top'
    | 'bottom'
    | 'right';

  @Input({ required: true }) type: 'dashed' | 'dotted' | 'solid' = 'solid';
  @Input() text!: string;
}
