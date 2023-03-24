import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Error/error/error.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { NoPageComponent } from './no-page/no-page.component';

const routes: Routes = [
  {path: '',
   redirectTo: 'login', pathMatch: "full"},

   {path: 'login',
   component: LoginPageComponent,
    title: 'HelpDesk Sign In'},

   {path: 'error',
   component: ErrorComponent,
    title: 'HelpDesk Error'},
   
  { path: 'ticketList', loadChildren: () => import('./ticket-list/ticket-list.module').then(m => m.TicketListModule),
    title: 'HelpDesk Tickets List'},  

   {path: 'ticket', loadChildren: () => import('./form/form.module').then(m => m.FormModule),
    title:  'HelpDesk Create Ticket'},
   
  { path: 'ticket/:id', loadChildren: () => import('./overview/overview.module').then(m => m.OverviewModule),
    title:  'HelpDesk Ticket Overview' },

  { path: 'ticket/:id', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule) },

   {path: '**',
   component: NoPageComponent,
   title: 'HelpDesk Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
