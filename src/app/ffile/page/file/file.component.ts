import { Component, Input, OnInit } from '@angular/core';
import { AttachmentResponse } from 'src/app/core/interface/attachment-response';
import { AttachmentService } from 'src/app/core/service/attachment.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit{
  token: any 
  attachments: AttachmentResponse [] = [] 
  @Input() id!: number 
  @Input() url: string =''
  

  constructor(private attachmentService: AttachmentService){
    this.token = sessionStorage.getItem('token')
  }

  ngOnInit(): void {
    this.getAttachment()
  }

  deleteFile(id: number){
    this.attachmentService.deleteFile(id).subscribe()
  }

  private getAttachment(){
    this.attachmentService.getAllFiles(this.id).subscribe({
      next:(resp: any)=>{ 
      for(let i = 0; i < resp.length; i++){    
        let attachment: AttachmentResponse = {id: resp[i].id, name: resp[i].name,
            path: `${resp[i].path + '?file='  + this.token}`,
            type: resp[i].type}
        this.attachments.push(attachment)         
      }   
    }
    })    
  } 
  
 

}
