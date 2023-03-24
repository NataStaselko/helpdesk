import { AbstractControl } from "@angular/forms";

export function passUpperCaseValidator(control: AbstractControl) :{[key: string]: boolean}| null{   
   if(control.value !== ''){
      if(control.value?.search('[A-Z]') === -1){
         return { uppercaseValid: true }
      }
   }
       return null
  }