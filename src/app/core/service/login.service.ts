import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/login/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  

  constructor(private http: HttpClient) {}  

  signUp(request: Login){   
    return this.http.post('http://localhost:8080/login', request);
  }
  
  logout(){
    return this.http.post('http://localhost:8080/exit', null)
  }
}
 