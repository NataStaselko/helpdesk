import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './page/form.component';
import { FormViewComponent } from './component/form-view.component';
import {CalendarModule} from 'primeng/calendar';
import { PipeModule } from '../core/pipe/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommentModule } from '../comment/comment.module';
import { FileModule } from '../ffile/file.module';
import { MessageModule } from '../message/message.module';

@NgModule({
    declarations: [
        FormComponent,
        FormViewComponent,
    ],
    imports: [
        CommonModule,
        FormRoutingModule,
        ReactiveFormsModule,
        CalendarModule,
        PipeModule,
        FontAwesomeModule,
        CommentModule,
        FileModule,
        MessageModule
    ]
})
export class FormModule { }
