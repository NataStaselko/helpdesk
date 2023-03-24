import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryResponce } from '../history-responce';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss']
})
export class HistoryViewComponent {
  @Input()  histories: HistoryResponce[] = []
  @Input()  page: number = 1;
  @Input()  total: number = 0;
  @Input()  pageSize: number = 0;
  @Output() changeToPage: EventEmitter<any> = new EventEmitter()
  emptyRows: HistoryResponce[] = []  

  getEmptyRows(){
    this.emptyRows = []
    for(let i = 0; i < 5 - this.histories.length; i++){
      this.emptyRows.push({date: '', user: '',
    action: '', description: ''})
    }
    return this.emptyRows
  }

  onChangePage(event: any){
    this.changeToPage.emit(event)
  }

}
