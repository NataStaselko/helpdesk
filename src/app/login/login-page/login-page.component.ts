import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';
import { UserService } from 'src/app/core/service/user.service';
import { MessageComponent } from 'src/app/message/message/message.component';
import { Login } from '../login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent{ 
  @ViewChild (MessageComponent) mess!: MessageComponent   
  messages: string[] = []

  constructor(private _loginAuth: LoginService, 
    private router: Router, 
    private user: UserService) {}

  clickMess(messages: string[]){
    this.messages = messages
    this.mess.clickMessage()
    }
  
  submit(login: Login){   
    sessionStorage.setItem('token', '')
    this._loginAuth.signUp(login).subscribe({
      next: (resp: any) => {
       sessionStorage.setItem('token', resp.token) 
        this.user.userName.next(resp.userName)
        this.user.role.next(resp.role)
        this.router.navigate(['ticketList'])             
      },  
      error:()=>{}
    }) 
  } 

}

