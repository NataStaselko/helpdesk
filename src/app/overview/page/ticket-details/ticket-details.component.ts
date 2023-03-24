import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketOverviewService } from 'src/app/core/service/ticket-overview.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit, OnDestroy{
  ticketId: number
  description: string = ''
  obs!: Subscription

  constructor(private router: Router,
    private ticketOverviewService: TicketOverviewService){
      this.ticketId = Number(router.routerState.snapshot.root.firstChild?.params['id'])      
  }
  
  ngOnInit(): void {
    this.obs = this.ticketOverviewService.ticketOverview
    .subscribe(v => this.description = v.description)
  }

  ngOnDestroy(): void {
    this.obs.unsubscribe()
  }

}
