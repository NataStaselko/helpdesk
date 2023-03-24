import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports:[
    MessageComponent
  ]
})
export class MessageModule { }
