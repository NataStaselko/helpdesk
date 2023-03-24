import { Component, Input } from '@angular/core';
import { TicketResponce } from 'src/app/core/interface/ticket-response';

@Component({
  selector: 'app-ticket-overview',
  templateUrl: './ticket-overview.component.html',
  styleUrls: ['./ticket-overview.component.scss']
})
export class TicketOverviewComponent{  
  @Input() ticket!: TicketResponce;
  @Input() url!: string
  @Input() role!: string
  @Input() buttonFeedback: string = ''
}
