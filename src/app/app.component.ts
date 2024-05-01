import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  messages!: any;
  value!: number;

  ngOnInit() {
    this.messages = [
      { severity: 'success', summary: 'Success', detail: 'Message Content' },
    ];
  }
}
