import { AbstractControl } from "@angular/forms";

export function specialCharValidator(control: AbstractControl) :{[key: string]: boolean}| null{   
   if(control.value !== ''){
      if(control.value?.search('[~."(),:;<>@!#$%&*+-/=?^_`{|}\\]\\[]') === -1){
         return { specialcharValid: true }
      }
   }
       return null
  }