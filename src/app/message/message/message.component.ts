import { Component, Input } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent { 
 @Input() messages: string [] = []
 @Input() position: boolean = false
 clickon: boolean = false
 x = faXmark

 clickMessage(){
  if(this.clickon){
    this.clickon =  false
  }else{
    this.clickon = true
  }
 }


}
