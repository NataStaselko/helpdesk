import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketList } from 'src/app/core/interface/ticket-list';
import { FeedbackPathService } from 'src/app/core/service/feedback-path.service';
import { TicketOverviewService } from 'src/app/core/service/ticket-overview.service';
import { TicketService } from 'src/app/core/service/ticket.service';
import { UserService } from 'src/app/core/service/user.service';
import { TicketListFilterComponent } from '../component/ticket-list-filter/ticket-list-filter.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy{
  @ViewChild(TicketListFilterComponent) filter?: TicketListFilterComponent
  tickets: TicketList[] = []
  totalItems: number = 0;   
  page: number = 1;
  pageSize: number = 0;
  sortBy: string = '';  
  orderBy: string = '';
  flag: string = '';
  filter_id: string = '';
  filter_name: string = '';
  filter_date: string = '';
  filter_urgency: string = '';
  filter_state: string = '';
  role: string = ''
  sub: Subscription




  constructor(private service: TicketService, private user: UserService,
    private router: Router, private ticketOverview: TicketOverviewService,
    private feedbackPath: FeedbackPathService){  
    this.sub = user.role.subscribe(v => this.role = v)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  ngOnInit(): void {
  this.getTickets()
  this.feedbackPath.feedbackPath.next(this.router.url)
  }

  changeFlag(value: string){
    this.filter?.removeFilter()
    this.flag = value
    this.page = 1
    this.sortBy=''
    this.orderBy = ''
    this.getTickets()    
  }
  
  changePage(value: any){
    this.page = value
    this.getTickets()
  }

  updateTable(){
    this.getTickets()
  }

  changeAction(value: string){
    let newAction = value.substring(0, value.indexOf(','))
    let ticketId = value.substring(value.indexOf(',') + 1, value.lastIndexOf(','))
    let ticketName = value.substring(value.lastIndexOf(',') + 1)
    let id: number
    if(Number(ticketId) !== undefined){
     id = Number(ticketId)     
     if(newAction === 'Leave Feedback'){
      this.ticketOverview.ticketName.next(ticketName)      
      this.router.navigate(['ticket', id, 'leave-feedback'])
     }else if(newAction === 'View Feedback'){
      this.ticketOverview.ticketName.next(ticketName)
      this.router.navigate(['ticket', id, 'view-feedback'])
     }else{
      this.service.changStatus(id, newAction).subscribe({
        next:()=>{ 
          this.getTickets()
        }
       })  
     }         
    }
  }

  removeFilter(){ 
    this.filter?.removeFilter()   
  }

  addButtonByFeedback(value: string){
    this.ticketOverview.actionByFeedback.next(value)    
  }

  private getTickets(){
    this.tickets = []   
    this.service.getTickets(this.flag, this.page - 1, this.sortBy, this.orderBy, 
      this.filter_id, this.filter_name, this.filter_date, 
      this.filter_urgency, this.filter_state).subscribe({
      next:(res: any) =>{      
        this.totalItems = res.totalElements  
        this.pageSize = res.pageSize      
        const content = res.content
        for(let i = 0; i < content.length; i++){
          this.tickets.push({id: content[i].id,
              name: content[i].name,
              desired_date: content[i].desired_date, 
              urgency: content[i].urgency, 
              state: content[i].state,
              action: content[i].actions})              
        }     
      }       
    })   
  }

}
