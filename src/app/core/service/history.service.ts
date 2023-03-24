import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistories(ticketId: number, pageNo: number){
    const params = new HttpParams()
    .set('ticketId', ticketId)
    .set('pageNo', pageNo)
    return this.http.get('http://localhost:8080/histories', {params})
  }
}
