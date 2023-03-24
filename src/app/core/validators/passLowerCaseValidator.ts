import { AbstractControl } from "@angular/forms";

export function passLowerCaseValidator(control: AbstractControl) :{[key: string]: boolean}| null{   
   if(control.value !== ''){
      if(control.value?.search('[a-z]') === -1){
         return { lowercaseValid: true }
      }
   }
       return null
  }
  