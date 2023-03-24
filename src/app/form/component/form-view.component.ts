import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/core/interface/category';
import { Ticket } from 'src/app/core/interface/ticket';
import { correctDateValidator } from 'src/app/core/validators/correctDateValidator';
import { texttValidator } from 'src/app/core/validators/textValidator';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { TicketResponce } from 'src/app/core/interface/ticket-response';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit{
  @Input() categories: Category[] = []
  @Input() urgencies: string[] = []
  @Input() url: string = ''
  @Input() ticket?: TicketResponce
  @Output() submitTicket: EventEmitter<Ticket> = new EventEmitter()
  @Output() clickMess: EventEmitter<string[]> = new EventEmitter()
  ticketForm: FormGroup
  categ: Category = {id: '', name: ''}
  exclam = faCircleExclamation
  stateTicket: string ='' 
  messages: string[] = []

  constructor(){  
      this.ticketForm = new FormGroup({
        category: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required, texttValidator, Validators.maxLength(100)]),
        description: new FormControl('', [texttValidator, Validators.maxLength(500)]),
        urgency: new FormControl('', [Validators.required]),
        date: new FormControl('', [correctDateValidator])
      })
  }

  ngOnInit(): void {
    if(this.url === 'edit'){
      this.ticketForm = new FormGroup({
        category: new FormControl(this.ticket?.category.id, [Validators.required]),
        name: new FormControl(this.ticket?.name, [Validators.required, texttValidator, Validators.maxLength(100)]),
        description: new FormControl(this.ticket?.description, [texttValidator, Validators.maxLength(500)]),
        urgency: new FormControl(this.ticket?.urgency, [Validators.required]),
        date: new FormControl(this.ticket?.desired_date, [correctDateValidator])
      })
    }
  }

  get category(){
    return this.ticketForm.get('category')
  }

  get name(){
    return this.ticketForm.get('name')
  }

  get description(){
    return this.ticketForm.get('description')
  }

  get urgency(){
    return this.ticketForm.get('urgency')
  }

saveTicket(){
  this.submitTicket.emit({
    name: this.ticketForm.controls['name'].value,
    description: this.ticketForm.controls['description'].value,
    desired_date: this.ticketForm.controls['date'].value,
    state: this.stateTicket,
    category: this.getCategoryById(),
    urgency: String(this.ticketForm.controls['urgency'].value).toUpperCase(),
  })
}

getDateForm(value: Date){
let arr = ['01', '02', '03', '04', "05", '06', '07', '08', '09', '10', '11', '12', ]
let month = arr[value.getMonth()]
let year = value.getFullYear().toString()
let day = value.getDate().toString()
if(value.getDate() < 10){
 day = `${'0' + value.getDate()}`
}
this.ticketForm.get('date')?.setValue(day + '/' + month + '/' + year)
}



 clickon(){
  this.messages = []  
    if(this.category?.errors?.['required']){
      this.messages.push('Category cannot be empty')
    }
    if(this.name?.errors?.['required']){
      this.messages.push('Name cannot be empty')
    }
    if(this.name?.errors?.['textValid']){
      this.messages.push('Name character error')
    }
    if(this.name?.errors?.['maxlength']){
      this.messages.push('Name exceed the 100 character limi')
    }
    if(this.description?.errors?.['textValid']){
      this.messages.push('Description character error')
    }
    if(this.description?.errors?.['maxLength']){
      this.messages.push('Description exceed the 500 character limit')
    }
    if(this.urgency?.errors?.['required']){
      this.messages.push('Urgency cannot be empty')
    }
    if(this.ticketForm.controls['date'].invalid){
      this.messages.push('Date cannot be past')
    }  
  this.clickMess.emit(this.messages)
 }


 private getCategoryById(){
  let id = this.ticketForm.controls['category'].value
  for(let i = 0; i < this.categories.length; i++){
    if(this.categories[i].id === id){
      this.categ = this.categories[i]        
    }
  }  
  return this.categ  
}



}
