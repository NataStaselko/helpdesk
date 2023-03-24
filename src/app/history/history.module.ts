import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryViewComponent } from './history-view/history-view.component';
import { HistoryComponent } from './page/history.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    HistoryComponent,
    HistoryViewComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
  ],
  exports: [   
    HistoryComponent
  ]
})
export class HistoryModule { }
