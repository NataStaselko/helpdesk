import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveFileComponent } from './page/save-file/save-file.component';
import { SaveFileViewComponent } from './component/save-file-view/save-file-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipeModule } from '../core/pipe/pipe.module';
import { FileOverviewComponent } from './component/file-overview/file-overview.component';
import { FileComponent } from './page/file/file.component';
import {ImageModule} from 'primeng/image';
import { NgxDocViewerModule } from 'ngx-doc-viewer';




@NgModule({
  declarations: [
    SaveFileComponent,
    SaveFileViewComponent,
    FileOverviewComponent,
    FileComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PipeModule,
    ImageModule,
    NgxDocViewerModule
    
    
  ],
  exports:[
    SaveFileComponent,
    FileComponent,
  ]
})
export class FileModule { }
