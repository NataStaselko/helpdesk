import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Attachment } from 'src/app/core/interface/attachment';
import { AttachmentService } from 'src/app/core/service/attachment.service';
import { SaveFileViewComponent } from '../../component/save-file-view/save-file-view.component';

@Component({
  selector: 'app-save-file',
  templateUrl: './save-file.component.html',
  styleUrls: ['./save-file.component.scss']
})
export class SaveFileComponent{
  @ViewChild(SaveFileViewComponent) files?: SaveFileViewComponent
  attachments: Attachment[] = []  
  @Output() clickMess: EventEmitter<string[]> = new EventEmitter()

  constructor(private attachmentService: AttachmentService, private router: Router){}


  saveFile(ticketId: number){
    this.files?.getFiles()
    if(this.attachments.length > 0){
      const formData = new FormData();  
      for (let i = 0; i < this.attachments.length; i++) { 
      formData.append('files', this.attachments[i].file);       
    }
    this.attachmentService.saveFile(formData, ticketId).subscribe()
    }  
  }

  clickon(messages: string[]){ 
    this.clickMess.emit(messages)
   }

}
