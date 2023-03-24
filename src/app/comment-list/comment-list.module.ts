import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListViewComponent } from './comment-list-view/comment-list-view.component';
import { CommentListComponent } from './page/comment-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommentModule } from '../comment/comment.module';
import { MessageModule } from '../message/message.module';



@NgModule({
  declarations: [
    CommentListComponent,
    CommentListViewComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    CommentModule,
    MessageModule 
  ],
  exports: [
    CommentListComponent
  ]
})
export class CommentListModule { }
