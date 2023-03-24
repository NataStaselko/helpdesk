import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './page/feedback.component';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../message/message.module';


@NgModule({
  declarations: [
    FeedbackComponent,
    FeedbackViewComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,    
    FontAwesomeModule,    
    ReactiveFormsModule,
    MessageModule 
  ]
})
export class FeedbackModule { }
