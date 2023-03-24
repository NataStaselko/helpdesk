import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Ticket } from '../interface/ticket';
;
@Injectable({
  providedIn: 'root'
})
export class TicketService {
 

  constructor(private http: HttpClient) { }

  create(request: Ticket){
    return firstValueFrom(this.http.post<string>('http://localhost:8080/tickets', request));
  }

  getTickets(flag: string, pageNo:number, sortBy: string, orderBy: string,
    filter_id: string,  filter_name: string, filter_date: string, 
    filter_urgency: string, filter_state: string){
    const params = new HttpParams()
    .set('flag', flag)
    .set('pageNo', pageNo)     
    .set('sortBy', sortBy)  
    .set('orderBy', orderBy)
    .set('filter_id', filter_id)
    .set('filter_name', filter_name)
    .set('filter_date', filter_date)
    .set('filter_urgency', filter_urgency)
    .set('filter_state', filter_state)
    return this.http.get('http://localhost:8080/tickets/', {params})
  }
 

  getTicketById(id: number){
    return this.http.get(`${'http://localhost:8080/tickets/' + id}`)
  }

  changStatus(id: number, action: string){
    const params = new HttpParams()
    .set('action', action)
    return this.http.put(`${'http://localhost:8080/tickets/' + id}`,null, {params})
  }
  
  updateTicket(id: number, request: Ticket){
    return this.http.put(`${'http://localhost:8080/tickets/' + id}`, request)
  }

}
