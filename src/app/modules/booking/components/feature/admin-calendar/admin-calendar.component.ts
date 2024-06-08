import { Component, OnInit } from '@angular/core';
import {
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
import { DialogService } from 'primeng/dynamicdialog';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
	selector: 'app-admin-calendar',
	templateUrl: './admin-calendar.component.html',
	styleUrls: ['./admin-calendar.component.scss'],
})
export class AdminCalendarComponent implements OnInit {
	events: unknown[] = [];
	calendarEl: HTMLElement | null = null;

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
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
		eventClick: (arg: EventClickArg) => this.handleEventClick(arg),
		editable: true,
		eventDrop: (arg: EventDropArg) => this.handleEventDrop(arg),
		buttonText: {
			today: "Aujourd'hui",
		},
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

	handleEventClick(arg: EventClickArg) {
		const event = arg.event;

		if (event && event.extendedProps && event.extendedProps['activity']) {
			this.openModal(event.extendedProps['activity']);
		} else {
			alert('No activity found for this event.');
		}
	}

	openModal(activity: Activity) {
		this.dialogService.open(CalendarModalComponent, {
			data: {
				activity: activity,
			},
			header: 'Details',
			width: '30%',
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
