import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-form',
  templateUrl: './button-form.component.html',
  styleUrl: './button-form.component.scss',
})
export class ButtonFormComponent implements OnInit {
  @Input({ required: true }) iconName!: string;
  icon!: string;

  ngOnInit(): void {
    this.icon = `pi pi-${this.iconName}`;
  }
}
