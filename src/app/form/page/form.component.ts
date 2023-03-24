import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/interface/category';
import { Ticket } from 'src/app/core/interface/ticket';
import { CategoryService } from 'src/app/core/service/category.service';
import { TicketService } from 'src/app/core/service/ticket.service';
import { UrgencyService } from 'src/app/core/service/urgency.service';
import { CommentComponent } from 'src/app/comment/comment/comment.component';
import { MessageComponent } from 'src/app/message/message/message.component';
import { SaveFileComponent } from 'src/app/ffile/page/save-file/save-file.component';
import { TicketOverviewService } from 'src/app/core/service/ticket-overview.service';
import { Subscription } from 'rxjs';
import { TicketResponce } from 'src/app/core/interface/ticket-response';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy{
  
@ViewChild (CommentComponent) comment!: CommentComponent
@ViewChild (SaveFileComponent) file!: SaveFileComponent
@ViewChild (MessageComponent) mess!: MessageComponent

  categories:Category[] = []
  urgencies: string[] = []
  url: string = ''
  messages: string[] = []
  obs!: Subscription
  text: string = ''
  ticket!: TicketResponce

  constructor(private router: Router,
    private categorySevice: CategoryService, 
    private urgencyService: UrgencyService, 
    private ticketServise: TicketService,
    private ticketOverviewService: TicketOverviewService){
    this.url = router.url.substring(router.url.lastIndexOf('/') + 1)
  }
  
  ngOnInit(): void {
    this.getCategories()
    this.getUegencies()
    if(this.url === 'edit'){
      this.obs = this.ticketOverviewService.ticketOverview.subscribe(v => this.ticket = v)
      

    }
  }

  ngOnDestroy(): void {
    if(this.url === 'edit'){
      this.obs.unsubscribe()
    }   
  }

  submitTicket(ticket: Ticket){
    if(this.url === 'create'){
      this.ticketServise.create(ticket).then(data =>
        { 
          this.comment.saveComment(Number(data))      
          this.file.saveFile(Number(data))    
          this.router.navigate(['/ticketList'])       
       })
    }else{
      this.ticketServise.updateTicket(Number(this.ticket?.id), ticket).subscribe({
        next:() =>{
          this.file.saveFile(Number(this.ticket?.id))
          this.comment.updateComment()
          this.router.navigate(['/ticketList']
          )}
      })
    }
   
  }

clickMess(messages: string[]){
  this.messages = messages
  this.mess.clickMessage()
}
  
  private getCategories(){
    this.categorySevice.getCategories().subscribe({
      next:(resp: any) =>{
       this.categories = resp          
      } 
     })
  }

  private getUegencies(){
    this.urgencyService.getUrgencies().subscribe({
      next: (resp: any) =>{              
        this.urgencies = resp        
      }
    })
  }

}
