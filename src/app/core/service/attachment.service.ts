import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  

  constructor(private http: HttpClient) { }

  saveFile(request: FormData, ticketId: number){
    const params = new HttpParams()
    .set('ticketId', ticketId)
    return this.http.post('http://localhost:8080/files', request, {params});
  }

  getAllFiles(ticketId: number){
    const params = new HttpParams()
    .set('ticketId', ticketId)
    return this.http.get('http://localhost:8080/files',{params});
  }

  deleteFile(id: number){
    return this.http.delete(`${'http://localhost:8080/files/' + id}`);
  }
  
}
