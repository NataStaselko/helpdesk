import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TicketResponce } from '../interface/ticket-response';

@Injectable({
  providedIn: 'root'
})
export class TicketOverviewService {
  
  ticketOverview = new BehaviorSubject<TicketResponce>({id: 0, name: '', createdOn: '', status: '',
  category: {id: '', name: ''}, urgency: '', desired_date: '',  owner: '',
  approver: '', assignee: '', description: ''})

  ticketName = new BehaviorSubject<string>('') 
  actionByFeedback = new BehaviorSubject<string>('') 

  constructor() { }
}
