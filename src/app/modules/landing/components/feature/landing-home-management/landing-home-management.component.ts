import { Component, OnInit } from '@angular/core';
import { LandingFunctioningDatas } from '@shared/models/types/landing-functioning-datas.type';
import { LandingHomeService } from '@shared/services/landing/landing-home.service';

@Component({
	selector: 'app-landing-home-management',
	templateUrl: './landing-home-management.component.html',
	styleUrl: './landing-home-management.component.scss',
})
export class LandingHomeManagementComponent implements OnInit {
	functionimgDatas!: LandingFunctioningDatas[];

	constructor(private _landingHomeService: LandingHomeService) {}

	ngOnInit(): void {
		this.functionimgDatas = this._landingHomeService.getFunctionimgDatas();
	}
}
