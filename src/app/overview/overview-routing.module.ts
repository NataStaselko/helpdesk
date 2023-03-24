import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentListComponent } from '../comment-list/page/comment-list.component';
import { HistoryComponent } from '../history/page/history.component';
import { OverviewComponent } from './page/overview/overview.component';
import { TicketDetailsComponent } from './page/ticket-details/ticket-details.component';
const routes: Routes = [
  { path: '', component: OverviewComponent,
  children: [
    {path: 'history',
    component: HistoryComponent,
    title: 'HelpDesk Ticket History'},

    {path: 'comments',
    component: CommentListComponent,
    title: 'HelpDesk Ticket Comments'},

    {path: 'details',
    component: TicketDetailsComponent,
    title: 'HelpDesk Ticket Details'}
  ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
