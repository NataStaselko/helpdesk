import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentComponent } from './comment/comment.component';
import { CommentViewComponent } from './comment-view/comment-view.component';



@NgModule({
  declarations: [
    CommentComponent,
    CommentViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports:[
    CommentComponent
  ]
})
export class CommentModule { }
