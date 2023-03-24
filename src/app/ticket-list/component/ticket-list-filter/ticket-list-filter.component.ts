import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, Subscription } from 'rxjs';
import { formDateValidator } from 'src/app/core/validators/formDateValidator';
import { texttValidator } from 'src/app/core/validators/textValidator';

@Component({
  selector: 'app-ticket-list-filter',
  templateUrl: './ticket-list-filter.component.html',
  styleUrls: ['./ticket-list-filter.component.scss']
})
export class TicketListFilterComponent implements OnDestroy{

  @Input() sortBy: string = ''  
  @Output() filter_id: EventEmitter<string> = new EventEmitter()
  @Output() filter_name: EventEmitter<string> = new EventEmitter()
  @Output() filter_date: EventEmitter<string> = new EventEmitter()
  @Output() filter_urgency: EventEmitter<string> = new EventEmitter()
  @Output() filter_state: EventEmitter<string> = new EventEmitter()
  @Output() orderBy: EventEmitter<string> = new EventEmitter()
  @Output() updateTable: EventEmitter<void> = new EventEmitter()

  subscr!: Subscription
  glass = faMagnifyingGlass
  filterForm: FormGroup
  marker: string = ''

  constructor(){
    this.filterForm = new FormGroup({
      filter: new FormControl()
    })
    this.addFilter()
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe()
  }

  addValidator(){
    this.filterForm.get('filter')?.clearValidators()
     if(this.sortBy === 'id' || this.sortBy === ''){
      this.filterForm.get('filter')?.setValidators(Validators.pattern('^[0-9]+$'))    
     }else if(this.sortBy === 'desired'){
      this.filterForm.get('filter')?.setValidators(formDateValidator)
     }else{
      this.filterForm.get('filter')?.setValidators(texttValidator)
     }
  }

  removeFilter(){
    this.filter_id.emit('')
    this.filter_name.emit('')
    this.filter_date.emit('')
    this.filter_urgency.emit('')
    this.filter_state.emit('')
    this.filterForm.get('filter')?.setValue('')
    this.marker =''
  }

  addFilter(){
    this.subscr = this.filterForm.get('filter')!.valueChanges.pipe(
      debounceTime(1000) 
    ).subscribe(v => {
      if(this.marker !== v){
        this.filter(v)
        this.marker = v
      }
    })
  }

  filter(value: string){
    if(this.filterForm.get('filter')?.valid){
      if(this.sortBy === 'id' || this.sortBy === ''){
        this.filter_id.emit(value)
        this.filter_name.emit('')
        this.filter_date.emit('')
        this.filter_urgency.emit('')
        this.filter_state.emit('')
      }
      if(this.sortBy === 'name'){
        this.filter_id.emit('')
        this.filter_name.emit(value)
        this.filter_date.emit('')
        this.filter_urgency.emit('')
        this.filter_state.emit('')
      }
      if(this.sortBy === 'desired'){
        this.filter_id.emit('')
        this.filter_name.emit('')
        this.filter_date.emit(value)
        this.filter_urgency.emit('')
        this.filter_state.emit('')
      }
      if(this.sortBy === 'urgency'){
        this.filter_id.emit('')
        this.filter_name.emit('')
        this.filter_date.emit('')
        this.filter_urgency.emit(value)
        this.filter_state.emit('')
      }
      if(this.sortBy === 'state'){
        this.filter_id.emit('')
        this.filter_name.emit('')
        this.filter_date.emit('')
        this.filter_urgency.emit('')
        this.filter_state.emit(value)
      }
      this.orderBy.emit('')  
      this.updateTable.emit()
    }  
  }
}

