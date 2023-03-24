import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  username: string= ''

  constructor(private userservice: UserService,
     private auth: LoginService,
     private router: Router){
    userservice.userName.subscribe((v) => this.username = v)
  }

  logout(){
    this.auth.logout().subscribe({
      next: ()=>{     
        sessionStorage.removeItem('token')     
        this.userservice.userName.next('') 
        this.userservice.role.next('')  
        this.router.navigate([''])    
      }
    })
   } 
}
