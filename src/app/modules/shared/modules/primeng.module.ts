import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { RatingModule } from 'primeng/rating';

@NgModule({
  exports: [ButtonModule, MessagesModule, RatingModule],
})
export class PrimengModule {}
