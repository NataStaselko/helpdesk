import { Component, EventEmitter, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Attachment } from 'src/app/core/interface/attachment';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-save-file-view',
  templateUrl: './save-file-view.component.html',
  styleUrls: ['./save-file-view.component.scss']
})
export class SaveFileViewComponent {
  x = faXmark
  fileW = faFileWord
  filePdf = faFilePdf
  exclam = faCircleExclamation
  src: string = ''
  attachments: Attachment[] = [] 
  messages: string[] = []   
  @Output() attachment: EventEmitter<Attachment[]> = new EventEmitter()
  @Output() clickMess: EventEmitter<string[]> = new EventEmitter()

  
  showPreview(event: any){
    for (let i = 0; i < event.target.files.length; i++){      
      const file = event.target.files[i]      
      if(file.type === 'image/png' || file.type === 'image/jpeg'){ 
      const reader = new FileReader();
      reader.onload = () => {
       let attachment: Attachment = new Attachment(file, reader.result as string)
       this.attachments.push(attachment)        
    }    
    reader.readAsDataURL(file)          
    }else{
      let attachment: Attachment = new Attachment(file, '')
      this.attachments.push(attachment)
    }     
  } 
}
remove(attachment: Attachment){
  for(let i = 0; i < this.attachments.length; i++){
    if(this.attachments[i] === attachment){
      this.attachments.splice(i, 1)
    }    
  }
}

checkSizeFile(attachment: Attachment){
  const fileSize = attachment.file.size
  if(fileSize <= 5242880){     
    return false
  }else{    
    return true
  }    
}

getFiles(){
  for(let i = 0; i < this.attachments.length; i++){
    if(this.attachments[i].file.size > 5242880){
      this.attachments.splice(i, 1)
    }    
  }
  this.attachment.emit(this.attachments)
}

clickon(){
  this.messages = []  
  this.messages.push('File should not be greater than 5 Mb')   
  this.clickMess.emit(this.messages)
 }

}
