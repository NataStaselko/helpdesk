import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timeout } from 'rxjs';
import { CommentComponent } from 'src/app/comment/comment/comment.component';
import { CommentService } from 'src/app/core/service/comment.service';
import { TicketOverviewService } from 'src/app/core/service/ticket-overview.service';
import { MessageComponent } from 'src/app/message/message/message.component';
import { CommentResponce } from '../comment-responce';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit, OnDestroy{
  @ViewChild (MessageComponent) mess!: MessageComponent
  @ViewChild (CommentComponent) comment!: CommentComponent
  messages: string[] = []
  obs!: Subscription
  ticketId: number
  status: string = ''
  comments: CommentResponce[]=[]
  pageNo: number = 1;
  totalItems: number = 0;
  pageSize: number = 0; 

  constructor(private router: Router,
     private commentService: CommentService,
     private ticketOverviewService: TicketOverviewService){
    this.ticketId = Number(router.routerState.snapshot.root.firstChild?.params['id'])
  }
  ngOnDestroy(): void {
    this.obs.unsubscribe()
  }

  ngOnInit(): void {
    this.getComments()
    this.obs = this.ticketOverviewService.ticketOverview.subscribe(v => this.status = v.status)   
  }

  changePage(value: any){
    this.pageNo = value
    this.getComments()
  }

  clickMess(messages: string[]){
    this.messages = messages
    this.mess.clickMessage()
  }

  addComment(){
      this.comment.saveComment(this.ticketId) 
      setTimeout(() => this.getComments(), 1000)      
  }

  private getComments(){
    this.comments = []
    this.commentService.getAllByTicket(this.ticketId, this.pageNo - 1).subscribe({
      next: (resp: any)=>{
        if(resp.content.length > 0){
          this.totalItems = resp.totalElements
        this.pageSize = resp.pageSize
        for(let i = 0; i < resp.content.length; i++ ){
          let userName = resp.content[i].userDto.first_name + ' ' + resp.content[i].userDto.last_name
          this.comments.push(
            {id: resp.content[i].id,  date: resp.content[i].date, user: userName, comment: resp.content[i].text}
          )          
        }        
      }
        }        
    })
  }  

}
