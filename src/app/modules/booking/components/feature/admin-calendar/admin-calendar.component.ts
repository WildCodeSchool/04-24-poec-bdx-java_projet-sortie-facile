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
		const dateStr = prompt('Enter a date in YYYY-MM-DD format');
		const date = new Date(dateStr + 'T00:00:00');

		if (!isNaN(date.valueOf())) {
			if (this.calendarApi) {
				this.calendarApi.addEvent({
					title: 'Dynamic Event',
					start: date,
					allDay: true,
				});
				alert('Great. Now, update your database...');
			} else {
				alert('Calendar API not available.');
			}
		} else {
			alert('Invalid date.');
		}
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
			console.error('Event start date is null');
			return;
		}

		const newDate = event.start.toISOString();
		const activityId = event.extendedProps['activityId'];

		this.activityService
			.updateActivity$(activityId, { date: newDate })
			.subscribe(
				(updatedActivity: Activity) => {
					console.log('Activité mise à jour avec succès :', updatedActivity);
				},
				error => {
					console.error("Erreur lors de la mise à jour de l'activité :", error);
					arg.revert();
				},
			);
	}
}
