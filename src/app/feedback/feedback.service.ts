import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from './feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  saveFeedback(request: Feedback, ticketId: number){
    const params = new HttpParams()
    .set('ticketId', ticketId)  
    return this.http.post('http://localhost:8080/feedbacks', request, {params})
  }

  getFeedback(ticketId: number){
    const params = new HttpParams()
    .set('ticketId', ticketId)
    return this.http.get('http://localhost:8080/feedbacks',{params})
  }
}
