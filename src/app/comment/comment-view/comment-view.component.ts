import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comments } from 'src/app/core/interface/comment';
import { texttValidator } from 'src/app/core/validators/textValidator';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { CommentEdit } from '../comment-edit';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent{

  commentForm: FormGroup
  textByComment: Comments = {text: ''}
  exclam = faCircleExclamation
  messages: string[] = []  
  @Input() url: string = ''
  @Output() comment: EventEmitter<Comments> = new EventEmitter()
  @Output() valid: EventEmitter<boolean> = new EventEmitter()
  @Output() clickMess: EventEmitter<string[]> = new EventEmitter()

  constructor(){
    this.commentForm = new FormGroup({
      text: new FormControl('', [texttValidator, Validators.maxLength(500)])
    })     
  } 
 
  get comm(){
    return this.commentForm.get('text')    
  }


  saveComment(){
    if(this.commentForm.valid){
      this.textByComment = {text: this.commentForm.controls['text'].value}
      this.comment.emit(this.textByComment)
    } 
    this.commentForm.reset()   
  }
  
  checkValid(){
    if(this.commentForm.valid){
      this.valid.emit(true)
    }else{
      this.valid.emit(false)
    }
  }

  clickon(){
    this.messages = []  
      if(this.comm?.errors?.['textValid']){
        this.messages.push('Comment character error')
      }
      if(this.comm?.errors?.['maxLength']){
        this.messages.push('Comment exceed the 500 character limit')
      }
    this.clickMess.emit(this.messages)
   }
  
}
