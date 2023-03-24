import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-details-view',
  templateUrl: './ticket-details-view.component.html',
  styleUrls: ['./ticket-details-view.component.scss']
})
export class TicketDetailsViewComponent {
  @Input() description: string = ''

}
