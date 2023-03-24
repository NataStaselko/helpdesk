import { Component,  OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketResponce } from 'src/app/core/interface/ticket-response';
import { FeedbackPathService } from 'src/app/core/service/feedback-path.service';
import { TicketOverviewService } from 'src/app/core/service/ticket-overview.service';
import { TicketService } from 'src/app/core/service/ticket.service';
import { UserService } from 'src/app/core/service/user.service';
import { HistoryComponent } from 'src/app/history/page/history.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy{
  @ViewChild(HistoryComponent) history!: HistoryComponent
  id: number;
  ticket: TicketResponce = {id: 0, name: '', createdOn: '', status: '',
  category: {id: '', name: ''}, urgency: '', desired_date: '',  owner: '',
  approver: '', assignee: '', description: ''}
  role: string = ''
  buttonFeedback: string = ''
  sub: Subscription
  subFeedbackButton: Subscription

  constructor(private router: Router,
    private ticketServise: TicketService,
    private ticketOverviewService: TicketOverviewService,
    private user: UserService, private feedbackPath: FeedbackPathService){
      this.id = router.routerState.snapshot.root.firstChild?.params['id'];
      this.sub = user.role.subscribe(v => this.role = v)
      this.subFeedbackButton = ticketOverviewService.actionByFeedback
      .subscribe(v => this.buttonFeedback = v)
    }
  
  ngOnInit(): void {
    this.getTicketOverview()
    this.feedbackPath.feedbackPath.next(this.router.url)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.subFeedbackButton.unsubscribe()
  }

  checkUrl(){
    return this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
  }


  private getTicketOverview(){
    this.ticketServise.getTicketById(this.id).subscribe({
      next:(resp: any)=>{
        let approved: string = ''
        let assignee: string = ''
        let description: string = ''
        if(resp.approved){
          approved = `${resp.approved.first_name + ' ' + resp.approved.last_name}`
        }
        
        if(resp.assignee){
          assignee = `${resp.assignee.first_name + ' ' + resp.assignee.last_name}`
        }
  
        if(resp.description){
          description = resp.description
        }
        this.ticket = {id: resp.id, name: resp.name, createdOn: resp.created_on, status: resp.state,
       category: {id: resp.category.id, name: resp.category.name}, urgency: resp.urgency, desired_date: resp.desired_date,
       owner: `${resp.owner.first_name + ' ' + resp.owner.last_name}`,
       approver: approved,
       assignee: assignee,
       description: description} 
       this.ticketOverviewService.ticketOverview.next(this.ticket)
      }      
     })     
  } 

}
