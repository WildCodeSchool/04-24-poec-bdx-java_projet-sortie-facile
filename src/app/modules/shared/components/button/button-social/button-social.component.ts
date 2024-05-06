import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-social',
  templateUrl: './button-social.component.html',
  styleUrl: './button-social.component.scss',
})
export class ButtonSocialComponent implements OnInit {
  @Input() providerName!: string;
  label!: string;

  ngOnInit(): void {
    this.label = `Se connecter avec ${this.providerName}`;
  }
}
