import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from 'src/app/Error/error.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router, private errorService: ErrorService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = sessionStorage.getItem('token')
      const reqClone = req.clone({
          setHeaders:{
              'Authorization': `Bearer ${token}`
          },
          params: this.removeNullQueryParams(req.params)
      })
      return next.handle(reqClone).pipe(
        catchError((err) =>{
            console.log(err)
            if (err.error instanceof ErrorEvent) {
                this.router.navigate([''])
                window.location.reload()
            }
            return throwError(()=>{this.errorService.handleError(err)})
        }))
        
    }
  

  private removeNullQueryParams(params: HttpParams) {
    const paramsKeysAux = params.keys();
    paramsKeysAux.forEach((key) => {
      const value = params.get(key);
      if (value === null || value === undefined || value === '') {
        params['map'].delete(key);
      }
    });
  
    return params;
  }
}
