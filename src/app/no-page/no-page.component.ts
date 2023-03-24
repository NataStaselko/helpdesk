import { Component } from '@angular/core';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-page',
  templateUrl: './no-page.component.html',
  styleUrls: ['./no-page.component.scss']
})
export class NoPageComponent {
  skull = faSkullCrossbones

}
