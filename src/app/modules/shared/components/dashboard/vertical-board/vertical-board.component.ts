import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-vertical-board',
	templateUrl: './vertical-board.component.html',
	styleUrl: './vertical-board.component.scss',
})
export class VerticalBoardComponent implements OnInit {
	data: any;

	options: any;

	ngOnInit() {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
		const textColorSecondary = documentStyle.getPropertyValue(
			'--text-color-secondary',
		);
		const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

		this.data = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'Nouvelle Inscription',
					backgroundColor: documentStyle.getPropertyValue('--blue-500'),
					borderColor: documentStyle.getPropertyValue('--blue-500'),
					data: [65, 59, 80, 81, 56, 55, 40],
				},
				{
					label: 'Desinscription',
					backgroundColor: documentStyle.getPropertyValue('--pink-500'),
					borderColor: documentStyle.getPropertyValue('--pink-500'),
					data: [28, 48, 40, 19, 86, 27, 90],
				},
			],
		};

		this.options = {
			maintainAspectRatio: false,
			aspectRatio: 0.8,
			plugins: {
				legend: {
					labels: {
						color: textColor,
					},
				},
			},
			scales: {
				x: {
					ticks: {
						color: textColorSecondary,
						font: {
							weight: 500,
						},
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false,
					},
				},
				y: {
					ticks: {
						color: textColorSecondary,
					},
					grid: {
						color: surfaceBorder,
						drawBorder: false,
					},
				},
			},
		};
	}
}
