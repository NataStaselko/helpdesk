import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './page/feedback.component';

const routes: Routes = [
  { path: 'leave-feedback', component: FeedbackComponent,
    title: 'HelpDesk Leave Feedback' },

  { path: 'view-feedback', component: FeedbackComponent,
    title: 'HelpDesk View Feedback' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
