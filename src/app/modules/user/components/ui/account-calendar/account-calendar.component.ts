import { Component, LOCALE_ID, OnInit } from '@angular/core';
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
import { Activity } from '@activity/models/classes/activity.class';
import { ActivityService } from '@shared/services/activity.service';
import { forkJoin } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { CalendarModalComponent } from '@shared/components/modal/calendar-modal/calendar-modal.component';

@Component({
	selector: 'app-account-calendar',
	templateUrl: './account-calendar.component.html',
	styleUrls: ['./account-calendar.component.scss'],
	providers: [
		{ provide: LOCALE_ID, useValue: 'fr' },
		{ provide: 'FULLCALENDAR_LOCALE', useValue: 'fr' },
	],
})
export class AccountCalendarComponent implements OnInit {
	events: any[] = [];
	calendarEl: HTMLElement | null = null;

	calendarOptions: CalendarOptions = {
		firstDay: 1,
		locale: 'fr',
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
		eventDrop: (arg: EventDropArg) => this.handleEventDrop(arg),

		editable: true,
		navLinks: true,
		buttonText: {
			today: "Aujourd'hui",
		},
	};

	constructor(
		private _activityService: ActivityService,
		private dialogService: DialogService,
	) {}

	ngOnInit() {
		const id = '1'; // Replace with the ID of the logged-in user
		const limit = 10; // Set your desired limit

		forkJoin({
			createdActivities: this._activityService.getActivityListByCreatedUser$(
				limit,
				Number(id),
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
			alert('No activity found for this date: ' + event);
		}
	}

	openModal(activity: Activity) {
		const ref = this.dialogService.open(CalendarModalComponent, {
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
