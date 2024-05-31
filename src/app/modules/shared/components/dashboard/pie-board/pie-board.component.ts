import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-pie-board',
	templateUrl: './pie-board.component.html',
	styleUrl: './pie-board.component.scss',
})
export class PieBoardComponent implements OnInit {
	data: any;

	options: any;

	ngOnInit() {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');

		this.data = {
			labels: ['Sport', 'Cinema', 'Cuisine'],
			datasets: [
				{
					data: [540, 325, 702],
					backgroundColor: [
						documentStyle.getPropertyValue('--blue-500'),
						documentStyle.getPropertyValue('--yellow-500'),
						documentStyle.getPropertyValue('--green-500'),
					],
					hoverBackgroundColor: [
						documentStyle.getPropertyValue('--blue-400'),
						documentStyle.getPropertyValue('--yellow-400'),
						documentStyle.getPropertyValue('--green-400'),
					],
				},
			],
		};

		this.options = {
			plugins: {
				legend: {
					labels: {
						usePointStyle: true,
						color: textColor,
					},
				},
			},
		};
	}
}
