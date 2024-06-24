import { Component, OnInit } from '@angular/core';
import {
	Calendar,
	CalendarOptions,
	EventApi,
	EventClickArg,
	EventDropArg,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { ActivityService } from '@shared/services/activity.service';
import { Observable, forkJoin } from 'rxjs';
import { CalendarModalComponent } from '@shared/components/modal/calendar-modal/calendar-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import frLocale from '@fullcalendar/core/locales/fr';
import { EventImpl } from '@fullcalendar/core/internal';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { Router } from '@angular/router';
import { CalendarEvent } from '@shared/models/types/calendar/calendar-event.type';
import { MessageService } from 'primeng/api';
import { BaseManagementComponent } from '@shared/directives/management.class';
import { TokenService } from '@shared/services/token.service';
import { AccountService } from '@shared/services/account.service';
import { Activity } from '@activity/models/classes/activity.class';

@Component({
	selector: 'app-account-calendar',
	templateUrl: './account-calendar.component.html',
	styleUrls: ['./account-calendar.component.scss'],
	providers: [MessageService],
})
export class AccountCalendarComponent
	extends BaseManagementComponent
	implements OnInit
{
	activityByCreatedUserList$!: Observable<Activity[]>;
	activityParticipateList$!: Observable<Activity[]>;
	events: CalendarEvent[] = [];
	calendarEl: HTMLElement | null = null;
	dialogRef: DynamicDialogRef | null = null;
	calendarApi!: Calendar;
	calendarOptions: CalendarOptions = {
		firstDay: 1,
		locale: frLocale,
		initialView: 'dayGridMonth',
		plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title addEventButton',
			right: 'dayGridMonth,timeGridWeek,timeGridDay',
		},
		customButtons: {
			addEventButton: {
				text: 'Ajouter Événement',
				click: () => {
					this.addEvent();
				},
			},
		},
		views: {
			dayGridMonth: {
				type: 'dayGridMonth',
				duration: { month: 1 },
				buttonText: 'Mois',
			},
			timeGridWeek: {
				type: 'timeGridWeek',
				duration: { weeks: 1 },
				buttonText: 'Semaine',
			},
			timeGridDay: {
				type: 'timeGridDay',
				duration: { days: 1 },
				buttonText: 'Jour',
			},
		},
		editable: true,
		navLinks: true,
		buttonText: {
			today: "Aujourd'hui",
		},
		eventClick: (arg: EventClickArg) => this.handleEventClick(arg),
		eventDrop: (arg: EventDropArg) => this.handleEventDrop(arg),
	};

	constructor(
		protected override _tokenService: TokenService,
		private _accountService: AccountService,
		private _activityService: ActivityService,
		private dialogService: DialogService,
		private _router: Router,
		private messageService: MessageService,
	) {
		super(_tokenService);
	}

	override ngOnInit() {
		super.ngOnInit();

		this.loadActivities();
	}

	loadActivities() {
		const connectedUserId =
			this._tokenService.getTokenFromLocalStorageAndDecode()?.id;

		if (connectedUserId) {
			this.activityByCreatedUserList$ =
				this._activityService.getActivityListByCreatedUser$(
					10,
					connectedUserId,
				);
			this.activityParticipateList$ =
				this._activityService.getListOfActivitiesRegisteredByUser$(
					10,
					connectedUserId,
				);

			forkJoin({
				createdActivities: this.activityByCreatedUserList$,
				participatedActivities: this.activityParticipateList$,
			}).subscribe(({ createdActivities, participatedActivities }) => {
				const createdEvents = createdActivities.map(activity => ({
					title: activity.name,
					start: activity.date,
					color: 'blue',
					extendedProps: { activity, activityId: activity.id },
				}));

				const participatedEvents = participatedActivities.map(activity => ({
					title: activity.name,
					start: activity.date,
					color: 'green',
					extendedProps: { activity, activityId: activity.id },
				}));

				this.events = [...createdEvents, ...participatedEvents];

				this.calendarOptions.events = this.events;

				if (this.calendarEl) {
					const calendar = new Calendar(this.calendarEl, this.calendarOptions);
					this.calendarApi = calendar;
					calendar.render();
					new Draggable(this.calendarEl, {
						itemSelector: '.fc-event',
						eventData: eventEl => {
							const eventTitle = eventEl.innerText.trim();
							return {
								title: eventTitle,
								duration: '02:00',
							};
						},
					});
				}
			});
		}
	}

	addEvent() {
		this._router.navigate([FullActivityRouteEnum.POST]);
	}

	handleEventClick(arg: EventClickArg) {
		const event = arg.event;

		if (event && event.extendedProps && event.extendedProps['activity']) {
			this.openModal(event);
		} else {
			alert('No activity found for this date: ' + event);
		}
	}

	openModal(event: EventImpl) {
		this.dialogRef = this.dialogService.open(CalendarModalComponent, {
			data: {
				activity: event.extendedProps['activity'],
				eventId: event.id,
			},
			header: 'Details',
			width: '30%',
		});

		this.dialogRef.onClose.subscribe(result => {
			if (result && result.deleted) {
				this.events = this.events.filter(
					e => e.extendedProps.activityId !== result.eventId,
				);
				this.calendarOptions.events = this.events;
			}
		});
	}

	handleEventDrop(arg: EventDropArg) {
		const event: EventApi = arg.event;
		if (!event.start) {
			return;
		}

		const newDate = event.start.toISOString();
		const activityId = event.extendedProps['activityId'];

		const updatedActivity = {
			...event.extendedProps['activity'],
			date: newDate,
		};

		this._activityService
			.updateActivity$(activityId, updatedActivity)
			.subscribe({
				next: () => {
					this.messageService.add({
						severity: 'success',
						summary: 'Succès',
						detail: "L'activité a été mise à jour avec succès",
					});
				},
				error: error => {
					console.error('Error updating activity:', error);
					arg.revert();
					this.messageService.add({
						severity: 'error',
						summary: 'Erreur',
						detail:
							"Erreur lors de la mise à jour de l'activité. Veuillez réessayer plus tard.",
					});
				},
			});
	}
}
