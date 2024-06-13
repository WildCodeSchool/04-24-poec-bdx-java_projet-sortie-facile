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
import { Activity } from '@activity/models/classes/activity.class';
import { CalendarModalComponent } from '@shared/components/modal/calendar-modal/calendar-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import frLocale from '@fullcalendar/core/locales/fr';
import { EventImpl } from '@fullcalendar/core/internal';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-calendar',
	templateUrl: './admin-calendar.component.html',
	styleUrls: ['./admin-calendar.component.scss'],
})
export class AdminCalendarComponent implements OnInit {
	events: any[] = [];
	calendarEl: HTMLElement | null = null;
	dialogRef: DynamicDialogRef | null = null;
	calendarApi!: Calendar;

	constructor(
		private activityService: ActivityService,
		private dialogService: DialogService,
		private _router: Router,
	) {}

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
		buttonText: {
			today: "Aujourd'hui",
		},
		eventClick: (arg: EventClickArg) => this.handleEventClick(arg),
		eventDrop: (arg: EventDropArg) => this.handleEventDrop(arg),
	};

	ngOnInit() {
		this.activityService
			.getActivityList$()
			.subscribe((activities: Activity[]) => {
				this.calendarOptions.events = activities.map(activity => ({
					title: activity.name,
					start: activity.date,
					extendedProps: { activity, activityId: activity.id },
				}));
				this.events = this.calendarOptions.events;
			});

		this.calendarEl = document.getElementById('calendar');
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
	}

	addEvent() {
		this._router.navigate([FullActivityRouteEnum.POST]);
	}
	handleEventClick(arg: EventClickArg) {
		const event = arg.event;

		if (event && event.extendedProps && event.extendedProps['activity']) {
			this.openModal(event, event.extendedProps['activity']);
		} else {
			alert('No activity found for this date: ' + event);
		}
	}

	openModal(event: EventImpl, activity: Activity) {
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

		this.activityService
			.updateActivity$(activityId, { date: newDate })
			.subscribe({
				next: () => {},
				error: () => {
					arg.revert();
				},
			});
	}
}
