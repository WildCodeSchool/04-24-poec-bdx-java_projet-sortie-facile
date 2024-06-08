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
import { Activity } from '@activity/models/classes/activity.class';
import { ActivityService } from '@shared/services/activity.service';
import { forkJoin } from 'rxjs';
import { CalendarModalComponent } from '@shared/components/modal/calendar-modal/calendar-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import frLocale from '@fullcalendar/core/locales/fr';
import { EventImpl } from '@fullcalendar/core/internal';
import { FullActivityRouteEnum } from '@shared/models/enums/routes/full-routes';
import { Router } from '@angular/router';

@Component({
	selector: 'app-account-calendar',
	templateUrl: './account-calendar.component.html',
	styleUrls: ['./account-calendar.component.scss'],
})
export class AccountCalendarComponent implements OnInit {
	events: any[] = [];
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
		private _activityService: ActivityService,
		private dialogService: DialogService,
		private _router: Router,
	) {}

	ngOnInit() {
		const id = '1'; // Replace with the ID of the logged-in user
		const limit = 10; // Set your desired limit

		forkJoin({
			createdActivities: this._activityService.getActivityListByCreatedUser$(
				limit,
				id,
			),
			participatedActivities:
				this._activityService.getListOfActivitiesRegisteredByUser$(limit, id),
		}).subscribe(({ createdActivities, participatedActivities }) => {
			const createdEvents = createdActivities.map(activity => ({
				title: activity.name,
				start: activity.date,
				color: 'blue',
				extendedProps: { activity, activityId: activity.id }, // Include activityId here
			}));

			const participatedEvents = participatedActivities.map(activity => ({
				title: activity.name,
				start: activity.date,
				color: 'green',
				extendedProps: { activity, activityId: activity.id }, // Include activityId here
			}));

			this.events = [...createdEvents, ...participatedEvents];

			this.calendarOptions.events = this.events;
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
		// const dateStr = prompt('Enter a date in YYYY-MM-DD format');
		// const date = new Date(dateStr + 'T00:00:00');

		// if (!isNaN(date.valueOf())) {
		// 	if (this.calendarApi) {
		// 		this.calendarApi.addEvent({
		// 			title: 'Dynamic Event',
		// 			start: date,
		// 			allDay: true,
		// 		});
		// 		alert('Great. Now, update your database...');
		// 	} else {
		// 		alert('Calendar API not available.');
		// 	}
		// } else {
		// 	alert('Invalid date.');
		// }
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

		this._activityService
			.updateActivity$(activityId, { date: newDate })
			.subscribe(
				(updatedActivity: Activity) => {
					console.log('Activity updated successfully:', updatedActivity);
				},
				error => {
					console.error('Error updating activity:', error);
					arg.revert();
				},
			);
	}
}
