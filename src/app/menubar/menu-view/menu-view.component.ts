import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.scss']
})
export class MenuViewComponent {
  @Input() username: string = '' 
  @Output() exit: EventEmitter<void> = new EventEmitter()
  arrow = faArrowRightToBracket 

  logout(){
    this.exit.emit()
  }

}
