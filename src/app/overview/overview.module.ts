import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { TicketOverviewComponent } from './component/ticket-overview/ticket-overview.component';
import { PipeModule } from '../core/pipe/pipe.module';
import { FileModule } from '../ffile/file.module';
import { HistoryModule } from '../history/history.module';
import { CommentListModule } from '../comment-list/comment-list.module';
import { TicketDetailsComponent } from './page/ticket-details/ticket-details.component';
import { OverviewComponent } from './page/overview/overview.component';
import { TicketDetailsViewComponent } from './component/ticket-details-view/ticket-details-view.component';


@NgModule({
  declarations: [
    OverviewComponent,
    TicketOverviewComponent,
    TicketDetailsComponent,
    TicketDetailsViewComponent,
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,  
    FileModule,
    PipeModule,
    HistoryModule,
    CommentListModule
  ]
})
export class OverviewModule { }
