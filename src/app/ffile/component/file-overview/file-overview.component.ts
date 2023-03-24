import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AttachmentResponse } from 'src/app/core/interface/attachment-response';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-file-overview',
  templateUrl: './file-overview.component.html',
  styleUrls: ['./file-overview.component.scss']
})
export class FileOverviewComponent {
  @Input() attachments!: AttachmentResponse[]
  @Input() url: string =''
  @Output() deleteFile: EventEmitter<number> = new EventEmitter()
  fileW = faFileWord
  filePdf = faFilePdf
  load = faDownload
  x = faXmark

  checkType(attach: AttachmentResponse){
    if(attach.type === 'doc' || attach.type === 'docx'){
      return 'doc'
    }
    if(attach.type === 'pdf'){
      return 'pdf'
    }
    return 'jpg'
  }

  deleteAttach(id: number){
    this.deleteFile.emit(id)
  }

}
