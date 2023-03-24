import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FeedbackPathService } from 'src/app/core/service/feedback-path.service';
import { TicketOverviewService } from 'src/app/core/service/ticket-overview.service';
import { MessageComponent } from 'src/app/message/message/message.component';
import { Feedback } from '../feedback';
import { FeedbackViewComponent } from '../feedback-view/feedback-view.component';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy{
  @ViewChild (MessageComponent) mess!: MessageComponent
  @ViewChild (FeedbackViewComponent) feed!: FeedbackViewComponent
  ticketId!: number 
  feedback: Feedback = {rate: 0, text: ''}
  name: string = ''
  path: string = ''
  url: string
  sub!: Subscription
  subPath: Subscription
  messages: string[] = []

  constructor(private ticketOverview: TicketOverviewService,
    private router: Router, private feedbackPath: FeedbackPathService,
    private feedbackService: FeedbackService){
    this.url = router.url.substring(router.url.lastIndexOf('/') + 1)
    this.getIdByPath(router.url)    
    this.subPath = feedbackPath.feedbackPath.subscribe(v => this.path = v)
    this.getTicketName()
  }
  ngOnInit(): void {
    if(this.url === 'view-feedback'){
      this.getFeedback()
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
    this.subPath.unsubscribe()
  }

  clickMess(messages: string[]){
    this.messages = messages
    this.mess.clickMessage()
  }
  
  private getIdByPath(value: string){
    let str = value.substring(0, value.lastIndexOf('/'))
    let num = Number(str.substring(str.lastIndexOf('/') + 1))
    if(!Number.isNaN(num)){
      this.ticketId = num
      }  
    }

    submit(feedback: Feedback){      
      this.feedbackService.saveFeedback(feedback, this.ticketId).subscribe({
        next: ()=>{          
          this.router.navigate(['ticketList'])          
        }
      })    
    }

   private getTicketName(){
    if(this.path === '/ticketList'){
      this.sub = this.ticketOverview.ticketName.subscribe(v => this.name = v)      
    }else{
      this.sub = this.ticketOverview.ticketOverview.subscribe(v => this.name = v.name)      
    }     
   }

   private getFeedback(){  
    this.feedbackService.getFeedback(this.ticketId).subscribe({
      next: (resp: any)=>{
        if(resp.length > 0){  
          this.feedback = {rate: resp[0].rate, text: resp[0].text}  
          this.feed.getFeedback(this.feedback)   
        }        
      }
    })
  }

}
