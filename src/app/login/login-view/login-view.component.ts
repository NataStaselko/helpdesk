import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passDigitValidator } from 'src/app/core/validators/passDigitValidator';
import { passLowerCaseValidator } from 'src/app/core/validators/passLowerCaseValidator';
import { passUpperCaseValidator } from 'src/app/core/validators/passUpperCaseValidator';
import { specialCharValidator } from 'src/app/core/validators/specialCharValidator';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Login } from '../login';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent {
  @Output() auth: EventEmitter<Login> = new EventEmitter()
  @Output() clickMess: EventEmitter<string[]> = new EventEmitter()
  login?: Login;
  loginForm: FormGroup;
  messages: string[] = []
  exclam = faCircleExclamation

  constructor() { 
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required,
        Validators.pattern('^[^@\s\.]+@[^@\s]+[\.]+[^@\s\.]+$'), Validators.maxLength(100)]),
      pass: new FormControl('', [Validators.required, 
        Validators.minLength(6), Validators.maxLength(20), passLowerCaseValidator, 
        passUpperCaseValidator, passDigitValidator, specialCharValidator])
    })
  }
 
  submit(){
    this.login = {username: this.loginForm.controls['email'].value,
     password: this.loginForm.controls['pass'].value}
     this.auth.emit(this.login)
  } 

  get email(){
    return this.loginForm.get('email')
  }

  get pass(){   
    return this.loginForm.get('pass')
    
  }

  clickon(){
    this.messages = []  
      if(this.email?.errors?.['required']){
        this.messages.push('Email cannot be empty')
      }
      if(this.email?.errors?.['pattern']){
        this.messages.push('Is not email')
      }
      if(this.email?.errors?.['maxlength']){
        this.messages.push('Maximum 100 characters')
      }
      if(this.pass?.errors?.['required']){
        this.messages.push('Password cannot be empty')
      }
      if(this.pass?.errors?.['lowercaseValid']){
        this.messages.push('At least one lowercase')
      }
      if(this.pass?.errors?.['uppercaseValid']){
        this.messages.push('At least one uppercase')
      }
      if(this.pass?.errors?.['digitValid']){
        this.messages.push('At least one numeric')
      }
      if(this.pass?.errors?.['specialcharValid']){
        this.messages.push('At least one character')
      }  
      if(this.pass?.errors?.['minlength']){
        this.messages.push('Minimum 6 characters')
      } 
      if(this.pass?.errors?.['maxlength']){
        this.messages.push('Maximum 20 characters')
      } 
    this.clickMess.emit(this.messages)
   }

}
