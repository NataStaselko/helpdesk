
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler{
  mes: string[] = []
  path = new BehaviorSubject<any>('')

  constructor(private router: Router) { }

  handleError(error: HttpErrorResponse): void {    
      switch(error?.status){

          case 401:{
          this.mes = []
          this.mes.push('Account not found! Please make sure you are using a correct email or password!')
          this.path.next(this.router.url)
          this.router.navigate(['/error'])
          break;
          }

          case 403:{
          this.mes = []
          this.mes.push('Account not found! Please make sure you are using a correct email or password!')
          this.path.next(this.router.url)
          this.router.navigate(['/error'])
          break;
          }

          case 417:{
            this.mes = []
            this.mes.push(error.error.message)
            this.path.next('/ticketList')
            this.router.navigate(['/error'])
            break;
            }   

          case 404:{this.router.navigate(['**'])}
          break;

          case 400:
            {this.mes = []
              for(let i = 0; i < error.error.length; i++){
                this.mes.push(error.error[i].message)
              }
              this.path.next(this.router.url)
              this.router.navigate(['/error'])  
              break; 
                
            }
          case 500:{
            this.mes = []
            this.mes.push('Server Error!')
            this.path.next(this.router.url)
            this.router.navigate(['/error'])
            break;
          }
    }   
  }
}
