import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketList } from '../../../core/interface/ticket-list';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faSortUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticket-list-view',
  templateUrl: './ticket-list-view.component.html',
  styleUrls: ['./ticket-list-view.component.scss']
})
export class TicketListViewComponent {
  @Input() tickets: TicketList[] = []  
  @Input() total: number = 0
  @Input() pageSize: number = 0
  @Input() page: number = 1
  @Input() sortBy: string = ''
  @Input() orderBy: string = ''
  @Input() flag: string = ''
  @Input() role: string = ''
  @Output() changeToPage: EventEmitter<any> = new EventEmitter()
  @Output() changeFlag: EventEmitter<string> = new EventEmitter()
  @Output() sort: EventEmitter<string> = new EventEmitter()
  @Output() order: EventEmitter<string> = new EventEmitter()
  @Output() updateTable: EventEmitter<void> = new EventEmitter()
  @Output() changeAction: EventEmitter<string> = new EventEmitter()
  @Output() clearFilter: EventEmitter<void> = new EventEmitter()
  @Output() actionByFeedback: EventEmitter<string> = new EventEmitter()

  sortIcon = faSort
  upIcon = faSortUp
  downIcon = faSortDown
  emptyRows: TicketList[] = []
  marker: boolean = false

  getEmptyRows(){
    this.emptyRows = []
    for(let i = 0; i < 5 - this.tickets.length; i++){
      this.emptyRows.push({id: '', name: '', 
      desired_date: '', urgency: '', state: '', action: []})
    }
    return this.emptyRows
  }

  clickBlueBatton(value: string){    
    if(this.flag !== value){
      this.changeFlag.emit(value)        
    }      
  }

  onChangePage(event: any){
    this.changeToPage.emit(event)
  }

  addSort(value: string){
    if(this.sortBy !== value || this.orderBy === 'desc'){
     this.sort.emit(value)
     this.order.emit('')
    }else{
      this.order.emit('desc')
    }
    this.clearFilter.emit()
    this.updateTable.emit()
  }

  chageIcon(value: string){
    if(this.sortBy === value){
      if(this.orderBy === ''){
        return this.upIcon
      }else{
        return this.downIcon
      }
    } 
    return this.sortIcon    
  }

  submit(value: string){
    this.changeAction.emit(value)
  }

  addActionByFeedback(ticket: TicketList){
    if(ticket.action !== null){
      let button = ticket.action[0]
      if(button.startsWith('Leave') || button.startsWith('View')){
        this.actionByFeedback.emit(button)     
      }
    }else{
      this.actionByFeedback.emit('') 
    }
  }
}
