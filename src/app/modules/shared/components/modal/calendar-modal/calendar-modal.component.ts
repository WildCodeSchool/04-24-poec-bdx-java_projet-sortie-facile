import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnInit } from '@angular/core';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'app-calendar-modal',
	templateUrl: './calendar-modal.component.html',
	styleUrl: './calendar-modal.component.scss',
})
export class CalendarModalComponent implements OnInit {
	@Input() activity!: Activity;
	@Input() connectedUser!: AuthUserPrimaryDatas;
	fullActivityRoute = FullActivityRouteEnum;

	constructor(
		public config: DynamicDialogConfig,
		public ref: DynamicDialogRef,
	) {}

	ngOnInit() {
		this.activity = this.config.data.activity;
	}

	deleteEvent() {
		this.ref.close({ deleted: true, eventId: this.activity.id });
	}

	close(): void {
		this.ref.close();
	}
}
