import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorService } from '../error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnDestroy{
  mess: string[] = []
  obs: Subscription
  path: any

 constructor(private erroeService: ErrorService, private router: Router){ 
  this.mess = erroeService.mes
  this.obs = this.erroeService.path.subscribe(v => this.path = v)
 }  

  click(){
    this.router.navigate([this.path])
  }

  ngOnDestroy(): void {
   this.obs.unsubscribe()
  }

}
