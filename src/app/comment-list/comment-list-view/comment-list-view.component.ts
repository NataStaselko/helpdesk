import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentResponce } from '../comment-responce';

@Component({
  selector: 'app-comment-list-view',
  templateUrl: './comment-list-view.component.html',
  styleUrls: ['./comment-list-view.component.scss']
})
export class CommentListViewComponent {
  @Input() comments: CommentResponce[]=[]
  @Input() status: string = ''
  @Input()  page: number = 1;
  @Input()  total: number = 0;
  @Input()  pageSize: number = 0;
  @Output() changeToPage: EventEmitter<any> = new EventEmitter()
  @Output() addComment: EventEmitter<void> = new EventEmitter()
  emptyRows: CommentResponce[]=[]

  getEmptyRows(){
    this.emptyRows = []
    for(let i = 0; i < 5 - this.comments.length; i++){
      this.emptyRows.push({id: 0, date: '', user: '', comment: ''})
    }
    return this.emptyRows
  }

  onChangePage(event: any){
    this.changeToPage.emit(event)
  }

  click(){
    this.addComment.emit()
  }

}
