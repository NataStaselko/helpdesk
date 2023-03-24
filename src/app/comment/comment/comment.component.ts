import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Comments } from 'src/app/core/interface/comment';
import { CommentService } from 'src/app/core/service/comment.service';
import { CommentEdit } from '../comment-edit';
import { CommentViewComponent } from '../comment-view/comment-view.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  @ViewChild(CommentViewComponent) comm?: CommentViewComponent
  @Input() url: string =''
  @Output() clickM: EventEmitter<string[]> = new EventEmitter()
  comment: Comments = {text: ''} 
  commentEdit: CommentEdit = {id: 0, text: ''}
  valid: boolean = true
  id!: number

  constructor(private commentService: CommentService, private router: Router){
    this.getIdByPath(router.url)
    
    }
  
  ngOnInit(): void {
    if(this.url === 'edit'){
      this.commentService.getAllByTicket(this.id, 0).subscribe({
        next: (resp: any)=>{
          if(resp.content.length > 0){ 
          this.commentEdit = {id: resp.content[0].id, text: resp.content[0].text}  
          this.comm?.commentForm.get('text')?.setValue(this.commentEdit.text)
          }
        }
      })
    }
  }
  

  saveComment(ticketId: number){   
      this.comm?.saveComment()
      if(this.comment.text !== ''){
        if(this.valid){
          this.commentService.saveComment(this.comment, ticketId).subscribe()
        }      
      }   
    } 
  
  
  updateComment(){
    this.comm?.saveComment()
    if(this.commentEdit.text !== ''){
      if(this.comment.text === ''){
        this.commentService.deleteComment(this.commentEdit.id).subscribe()
      }else if(this.comment.text !== this.commentEdit.text){
        if(this.valid){
        this.commentService.upgateComment(this.commentEdit.id, this.comment).subscribe()
        }
      }
    }else if(this.comment.text !== ''){
      if(this.valid){
      this.commentService.saveComment(this.comment, this.id).subscribe()
      }
    }      
  }


clickon(messages: string[]){ 
 this.clickM.emit(messages)
}

private getIdByPath(value: string){
  let str = value.substring(0, value.lastIndexOf('/'))
  let num = Number(str.substring(str.lastIndexOf('/') + 1))
  if(!Number.isNaN(num)){
    this.id = num
    }  
  }
}
