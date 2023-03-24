import { AbstractControl } from "@angular/forms";

export function texttValidator(control: AbstractControl) :{[key: string]: boolean}| null{   
   if(control.value !== ''){
      if(control.value?.search('^[A-Za-z0-9~."(),:;<>@!#$%&*+-/=?^_`{|}\\]\\[ ]+$') === -1){
         return { textValid: true }
      }
   }
       return null
  }
  