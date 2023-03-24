import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketListRoutingModule } from './ticket-list-routing.module';
import { TicketListComponent } from './page/ticket-list.component';
import { TicketListViewComponent } from './component/ticket-list-view/ticket-list-view.component';
import { TicketListFilterComponent } from './component/ticket-list-filter/ticket-list-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../core/pipe/pipe.module';


@NgModule({
  declarations: [
    TicketListComponent,
    TicketListViewComponent,
    TicketListFilterComponent
  ],
  imports: [
    CommonModule,
    TicketListRoutingModule,
    NgxPaginationModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    PipeModule,
  ]
})
export class TicketListModule { }
