import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from '@landing/landing-routing.module';
import { LandingHomeComponent } from '@landing/pages/landing-home/landing-home.component';
import { SharedModule } from '@shared/shared.module';
import { LandingHomeManagementComponent } from '@landing/components/feature/landing-home-management/landing-home-management.component';
import { CardLandingSmallComponent } from '@landing/components/ui/cards/card-landing-small/card-landing-small.component';
import { CardLandingLargeComponent } from '@landing/components/ui/cards/card-landing-large/card-landing-large.component';

@NgModule({
	declarations: [
		LandingHomeComponent,
		LandingHomeManagementComponent,
		CardLandingSmallComponent,
		CardLandingLargeComponent,
	],
	imports: [CommonModule, LandingRoutingModule, SharedModule],
})
export class LandingModule {}
