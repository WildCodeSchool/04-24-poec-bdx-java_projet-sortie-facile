import { Activity } from '@activity/models/classes/activity.class';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserPrimaryDatas } from '@shared/models/classes/auth-user/auth-user-primary-datas.class';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { ActivityService } from '@shared/services/activity.service';
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
	activityId!: number;
	bookingCount!: number;
	constructor(
		private activityService: ActivityService,

		public config: DynamicDialogConfig,
		public ref: DynamicDialogRef,
		private route: ActivatedRoute,
		private _router: Router,
	) {}

	ngOnInit() {
		this.activity = this.config.data.activity;

		this.activityService
			.getActivityById$(this.activityId.toString()) // Convertissez en chaîne si nécessaire
			.subscribe(activity => {
				this.activity = activity;

				if (this.activity) {
					this.countBookings();
				} else {
					console.log('Activité non trouvée ou nulle.');
					// Gérer le cas où l'activité est nulle, par exemple rediriger ou afficher un message d'erreur
				}
			});
	}
	countBookings(): void {
		this.activityService.countBookings(this.activityId).subscribe(count => {
			this.bookingCount = count;
		});
	}
	deleteEvent() {
		this.ref.close({ deleted: true, eventId: this.activity.id });
	}

	close(): void {
		this.ref.close();
	}
}
