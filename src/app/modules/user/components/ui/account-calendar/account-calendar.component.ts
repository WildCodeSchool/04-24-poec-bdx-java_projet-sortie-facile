import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, {
	DateClickArg,
	Draggable,
} from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Activity } from '@activity/models/classes/activity.class';
import { ActivityService } from '@shared/services/activity.service';
import { forkJoin } from 'rxjs';
import { CalendarModalComponent } from '@shared/components/modal/calendar-modal/calendar-modal.component';
import { DialogService } from 'primeng/dynamicdialog';

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
	calendarOptions: CalendarOptions = {
		firstDay: 1,
		locale: 'fr',
		initialView: 'dayGridMonth', // Initial view should be a single value
		plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay', // Add your desired views here
		},
		views: {
			dayGridMonth: {
				// Custom view for list day
				type: 'dayGridMonth',
				duration: { month: 1 },
				buttonText: 'Mois',
			},
			timeGridWeek: {
				// Custom view for time grid week
				type: 'timeGridWeek',
				duration: { weeks: 1 },
				buttonText: 'Semaine',
			},
			timeGridDay: {
				// Custom view for time grid day
				type: 'timeGridDay',
				duration: { days: 1 },
				buttonText: 'Jour',
			},
		},

		dateClick: (arg: DateClickArg) => this.handleDateClick(arg),
		events: [
			{ title: 'event 1', date: '2024-06-01' },
			{ title: 'event 2', date: '2024-06-02' },
		],
		editable: true, // Allow events to be dragged and resized
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
		const id = '1'; // Remplacez par l'ID de l'utilisateur connecté
		const limit = 10; // Définissez la limite souhaitée

		// Utilisez forkJoin pour attendre les deux observables
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
				color: 'blue', // Couleur pour les activités créées
				extendedProps: { activity },
			}));

			const participatedEvents = participatedActivities.map(activity => ({
				title: activity.name,
				start: activity.date,
				color: 'green', // Couleur pour les activités auxquelles l'utilisateur participe
				extendedProps: { activity },
			}));

			this.events = [...createdEvents, ...participatedEvents];

			this.calendarOptions.events = this.events;
		});
	}
	handleDateClick(arg: DateClickArg) {
		const clickedDate = arg.dateStr;

		// Trouver l'activité correspondant à la date cliquée
		const event = this.events.find(event =>
			event.start.startsWith(clickedDate),
		);

		if (event && event.extendedProps && event.extendedProps.activity) {
			this.openModal(event.extendedProps.activity);
		} else {
			alert('No activity found for this date: ' + clickedDate);
		}
	}

	openModal(activity: Activity) {
		const ref = this.dialogService.open(CalendarModalComponent, {
			data: {
				activity: activity,
			},
			header: 'Activity Details',
			width: '70%',
		});

		ref.onClose.subscribe(() => {
			// Code à exécuter après la fermeture de la modal (optionnel)
		});
	}

	// eslint-disable-next-line @angular-eslint/use-lifecycle-interface
	ngAfterViewInit() {
		const draggableEl = document.getElementById('draggable-el');

		if (draggableEl) {
			new Draggable(draggableEl, {
				eventData: {
					title: 'Draggable Event',
					duration: '02:00',
				},
			});
		}
	}
}
