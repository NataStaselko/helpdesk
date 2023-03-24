import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { texttValidator } from 'src/app/core/validators/textValidator';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Feedback } from '../feedback';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.scss']
})
export class FeedbackViewComponent {
  
  @Input() name: string = ''
  @Input() ticketId!: number
  @Input() path: string = ''
  @Input() url: string = ''
  @Input() feedback!: Feedback 
  @Output() clickMess: EventEmitter<string[]> = new EventEmitter()
  @Output() newFeedback: EventEmitter<Feedback> = new EventEmitter()
  feedbackForm!: FormGroup
  rate: number = 0
  stars: number[] = [1, 2, 3, 4, 5]  
  rates: number[] = []
  readable: boolean = false
  exclam = faCircleExclamation
  messages: string[] = []

  constructor(){
    this.feedbackForm = new FormGroup({     
      text: new FormControl( '', [texttValidator, Validators.maxLength(500)])
    })
  } 

  get text(){
    return this.feedbackForm.get('text')
  }

  getRate(value: number){   
    if(this.url === 'leave-feedback'){
      this.rate = value
      this.rates = []
      for(let i =0; i < value; i++){
        this.rates.push(this.stars[i])
      } 
    }  
  }

  clickon(){
    this.messages = []  
      if(this.text?.errors?.['textValid']){
        this.messages.push('Feedback character error')
      }
      if(this.text?.errors?.['maxLength']){
        this.messages.push('Feedback exceed the 500 character limit')
      }
    this.clickMess.emit(this.messages)
   }

   addFeedback(){
    if(this.feedbackForm.valid){
      this.newFeedback.emit({rate: this.rate, text: this.feedbackForm.controls['text'].value})
    }    
   }

   getFeedback(feedback: Feedback){
    if(this.url === 'view-feedback'){      
      this.readable = true
      for(let i =0; i < feedback.rate; i++){
        this.rates.push(this.stars[i])
      } 
      this.feedbackForm.get('text')?.setValue(feedback.text)
    }
   }
   

}
