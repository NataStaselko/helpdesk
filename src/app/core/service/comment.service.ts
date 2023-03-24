import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comments } from '../interface/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  saveComment(comment: Comments, ticketId: number){
    const params = new HttpParams()
    .set('ticketId', ticketId)
    return this.http.post('http://localhost:8080/comments', comment, {params})
  }

  getAllByTicket(ticketId: number, pageNo: number){
    const params = new HttpParams()
    .set('ticketId', ticketId)
    .set('pageNo', pageNo)
    return this.http.get('http://localhost:8080/comments', {params})
  }

  upgateComment(commentId: number, comment: Comments){
    return this.http.put(`${'http://localhost:8080/comments/' + commentId}`, comment)
  }

  deleteComment(commentId: number){
    return this.http.delete(`${'http://localhost:8080/comments/' + commentId}`)
  }
 
}

